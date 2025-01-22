import Group from '../model/group.js';
import { Message } from '../model/message.js';
import User from '../model/user.js';
import GroupMember from '../model/groupMember.js'; // Import GroupMember
import { validateMessage } from '../validation/messageValidator.js'; 
import mongoose from 'mongoose';
import {catchAsync} from "../helper/catchAsync.js"


const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const groupId = req.params.groupId;
    const senderId = req.user._id.toString();

    if (!groupId || (!content && !req.file)) {
      return res.status(400).json({
        success: false,
        message: "Group ID and message content or file are required.",
      });
    }

    try {
      validateMessage({ groupId, senderId, content });
    } catch (validationError) {
      return res.status(400).json({ success: false, message: validationError.message });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ success: false, message: "Sender not found." });
    }

    const isMember = await GroupMember.findOne({ groupId, userId: senderId });
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Sender is not a member of the group.",
      });
    }

    let filePath = null;
    if (req.file) {
      filePath = `/images/messages/${req.file.filename}`;
    }

    const message = new Message({
      groupId,
      senderId,
      content,
      file: filePath,
    });

    const savedMessage = await message.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
const editMessage = async (req, res) => {
  try {
    const { content, file } = req.body; 
    const messageId = req.params.messageId; 
    const senderId = req.user._id.toString(); 

    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ success: false, message: 'Invalid senderId.' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    if (message.senderId.toString() !== senderId) {
      return res.status(403).json({
        success: false,
        message: 'You are not the sender of this message.',
      });
    }

    message.content = content || message.content;
    message.file = file || message.file;

    const updatedMessage = await message.save();

    return res.status(200).json({
      success: true,
      message: 'Message updated successfully.',
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Error editing message:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;
    const senderId = req.user._id.toString();

    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ success: false, message: 'Invalid senderId.' });
    }

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ success: false, message: 'Invalid groupId.' });
    }

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ success: false, message: 'Invalid messageId.' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found.' });
    }

    if (message.senderId.toString() !== senderId && group.creatorID.toString() !== senderId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this message.',
      });
    }

    message.isDeleted = true;
    await message.save();

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
// const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded.',
//       });
//     }

//     const { originalname, mimetype, size, filename } = req.file;

//     return res.status(201).json({
//       success: true,
//       message: 'File uploaded successfully.',
//       data: {
//         originalName: originalname,
//         mimeType: mimetype,
//         size: size,
//         fileName: filename,
//         filePath: `/uploads/${filename}`, // Provide the relative path for accessing the file
//       },
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error.',
//     });
//   }
// };
const getMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const senderId = req.user._id.toString();

    const groupMember = await GroupMember.findOne({ groupId, userId: senderId });
    if (!groupMember) {
      return res.status(403).json({
        success: false,
        message: 'You are not a member of this group.',
      });
    }

    const messagesWithSenderInfo = await Message.find({ groupId, isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('senderId', 'username')
      .select('senderId content file ')
      .lean();

    const result = [];
    for (let i = 0; i < messagesWithSenderInfo.length; i++) {
      const message = messagesWithSenderInfo[i];
      result.push({
        senderId: message.senderId._id,
        Sender: message.senderId.username,
        content: message.content,
        file: message.file,
        timestamp: message.timestamp,
      });
    }

    if (messagesWithSenderInfo.length > 0) {
      const latestMessageId = messagesWithSenderInfo[0]._id; 

      await GroupMember.findOneAndUpdate(
        { groupId, userId: senderId },
        { seenMessageID: latestMessageId },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Messages retrieved successfully.',
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

const messageController = { sendMessage,editMessage, deleteMessage, getMessages};
export default messageController;
