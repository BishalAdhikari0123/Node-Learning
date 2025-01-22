import Group from "../model/group.js";
import GroupMember from "../model/groupMember.js";
import User from "../model/user.js";

const addMemberToPrivateGroup = async (req, res) => {
  try {
    const { groupID } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupID);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }
    if (!group.isPrivate) {
      return res.status(400).json({ error: "This group is not private." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingMember = await GroupMember.findOne({ groupId: groupID, userId });
    if (existingMember) {
      return res.status(400).json({ error: "User is already a member of this group." });
    }

    const newMember = await GroupMember.create({
      userId,
      groupId: groupID,
      joinDate: new Date(),
      seenMessageID: null,
    });

    return res.status(201).json({
      message: "User added to the group successfully.",
      member: newMember,
    });
  } catch (error) {
    console.error("Error adding member to private group:", error.message);
    return res.status(500).json({ error: "An error occurred while adding the member to the group." });
  }
};

const removeMemberFromPrivateGroup = async (req, res) => {
  try {
    const { groupID } = req.params;
    const { userId } = req.body;

    console.log("Group ID:", groupID);
    console.log("User ID to remove:", userId);

    const group = await Group.findById(groupID);
    if (!group) {
      console.log("Group not found.");
      return res.status(404).json({ error: "Group not found." });
    }

    console.log("Group found:", group);

    if (!group.isPrivate) {
      console.log("This group is not private.");
      return res.status(400).json({ error: "This group is not private." });
    }

    const isAuthorized =
      group?.creatorID?.toHexString() === req.user?._id?.toHexString() ||
      (group?.admins && group.admins.some(adminId => adminId.toHexString() === req.user?._id?.toHexString()));

    if (!isAuthorized) {
      console.log("User is not authorized to remove members from the group.");
      return res.status(403).json({ error: "You are not authorized to remove members from this group." });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    console.log("User found:", user);

    const existingMember = await GroupMember.findOne({ groupId: groupID, userId });
    if (!existingMember) {
      console.log("User is not a member of this group.");
      return res.status(400).json({ error: "User is not a member of this group." });
    }

    console.log("Existing member found:", existingMember);

    const deletionResult = await GroupMember.deleteOne({ groupId: groupID, userId });
    console.log("Deletion Result:", deletionResult);

    if (deletionResult.deletedCount === 0) {
      console.log("Failed to remove the member.");
      return res.status(400).json({ error: "Failed to remove the member from the group." });
    }

    return res.status(200).json({
      message: "User removed from the group successfully.",
    });
  } catch (error) {
    console.error("Error removing member from private group:", error);
    return res.status(500).json({ error: "An error occurred while removing the member from the group." });
  }
};
  
  const getUserJoinedGroups = async (req, res) => {
    try {
      const userId = req.user._id;
      console.log("User ID:", userId);
  
      const userGroups = await GroupMember.find({ userId }).populate('groupId');
      console.log("User Groups (Memberships):", userGroups);
  
      const groupIds = userGroups.map(groupMember => groupMember.groupId._id);
      console.log("Group IDs User is a Member Of:", groupIds);
  
      const groups = await Group.find({
        _id: { $in: groupIds },
        $or: [{ creator: userId }, { _id: { $in: groupIds } }]
      });
      console.log("Groups Found:", groups);
  
      if (!groups || groups.length === 0) {
        return res.status(404).json({ error: "No groups found for this user." });
      }
  
      return res.status(200).json({
        message: "Groups fetched successfully. User is a member of these groups.",
        groups,
      });
    } catch (error) {
      console.error("Error fetching user groups:", error.message);
      return res.status(500).json({ error: "An error occurred while fetching groups." });
    }
  };
  
  const joinPublicGroup = async (req, res) => {
    try {
      const { groupID } = req.params;
      const userId = req.user._id;
  
      const group = await Group.findById(groupID);
      if (!group) {
        return res.status(404).json({ error: "Group not found." });
      }
  
      if (group.isPrivate) {
        return res.status(400).json({ error: "This group is private and cannot be joined directly." });
      }
  
      const existingMember = await GroupMember.findOne({ groupId: groupID, userId });
      if (existingMember) {
        return res.status(400).json({ error: "You are already a member of this group." });
      }
  
      const newMember = await GroupMember.create({
        userId,
        groupId: groupID,
        joinDate: new Date(),
        seenMessageID: null,
      });
  
      return res.status(201).json({
        message: "Successfully joined the public group.",
        member: newMember,
      });
    } catch (error) {
      console.error("Error joining public group:", error.message);
      return res.status(500).json({ error: "An error occurred while joining the group." });
    }
  };
  
export default {
  addMemberToPrivateGroup,removeMemberFromPrivateGroup,getUserJoinedGroups,joinPublicGroup
};

