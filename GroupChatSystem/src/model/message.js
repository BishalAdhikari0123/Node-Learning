import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  file: { type: String },
  isDeleted: { type: Boolean, default: false },
},{timestamps:true});



export const Message = mongoose.model('Message', messageSchema);
