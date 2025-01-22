import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expirationTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Otp = mongoose.model('Otp', otpSchema);
