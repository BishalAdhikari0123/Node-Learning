import Joi from "joi";

// Schema for Forgot Password (Send OTP)
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Schema for Sending OTP
const sendOTPSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Schema for Reset Password
const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(8).required(),
  newPassword: Joi.string().min(8).required(),
});

// Export all schemas
const resetPasswordValidation = {
  forgotPassword: forgotPasswordSchema,
  sendOTP: sendOTPSchema,
  resetPassword: resetPasswordSchema,
};

export default resetPasswordValidation;
