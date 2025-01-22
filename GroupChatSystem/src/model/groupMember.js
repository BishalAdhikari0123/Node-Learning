import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  joinDate: { type: Date, default: Date.now },
  seenMessageID: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
});

const GroupMember = mongoose.model("GroupMember", groupMemberSchema);

export default GroupMember;
