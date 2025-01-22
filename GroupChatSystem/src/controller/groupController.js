import { catchAsync } from "../helper/catchAsync.js";
import Group from "../model/group.js";
import GroupMember from "../model/groupMember.js";
const createGroup = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ error: "User not authenticated." });
      }
  
      const { name, description, isPrivate } = req.body;
      const userId = req.user._id;  
  
      const newGroup = await Group.create({
        name,
        description,
        creatorID: userId,
        isPrivate,
        createdAt: new Date(),
      });
      await GroupMember.create({
        userId: req.user._id,
        groupId: newGroup._id,
        joinDate: new Date(),
        seenMessageID: null, 
      });
      return res.status(201).json({
        message: "Group created successfully.",
        group: newGroup,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "An error occurred while creating the group.",
      });
    }
  };
  const getAllPublicGroups = async (req, res) => {
    try {
        const publicGroups = await Group.find({ isPrivate: false });

        return res.status(200).json({
            message: "Public groups retrieved successfully.",
            groups: publicGroups,
        });
    } catch (error) {
        console.error("Error fetching public groups:", error.message);
        return res.status(500).json({ error: "An error occurred while retrieving public groups." });
    }
};
const editGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description, isPrivate } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, description, isPrivate },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: "Group not found." });
    }

    return res.status(200).json({
      message: "Group updated successfully.",
      group: updatedGroup,
    });
  } catch (error) {
    console.error("Error updating group:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the group." });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    if (group.creatorID.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Only the creator can delete this group." });
    }

    await Group.findByIdAndDelete(groupId);

    return res.status(200).json({
      message: "Group deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the group." });
  }
};




  export default { createGroup,getAllPublicGroups,editGroup,deleteGroup };
  