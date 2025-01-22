import { catchAsync } from "../helper/catchAsync.js";
import User from "../model/user.js";
import { createJWT, findUserByEmail } from "../service/user.js";
import bcrypt from 'bcrypt';
import { generateOTP, sendEmailWithOTP } from "../mailer/email.js";
import { Otp } from "../model/otp.js";

const register = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;

  console.log("Email debug");
  const existingUser = await findUserByEmail(email);
  
  if (existingUser) {
    if (existingUser.isEmailVerified) {
      throw new Error("Email already taken");
    } else {
      const otp = generateOTP();
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000); 

      await Otp.create({ email, otp, expirationTime });

      await sendEmailWithOTP(email, otp);

      return res.status(200).json({
        message: "Email already registered, please check your inbox for the OTP.",
      });
    }
  }
  
  // console.log("Email verification debug");
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error("Username already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    isEmailVerified: false,
  });

  const otp = generateOTP();
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); 

  await Otp.create({ email, otp, expirationTime });

  await sendEmailWithOTP(email, otp);

  // const token = createJWT(newUser._id);

  return res.status(201).json({
    message: "Registration successful. Please verify your email.",
    user: {
      username: newUser.username,
      email: newUser.email,
      // token,
    },
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;  

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    throw new Error("Invalid OTP or email");
  }

  if (otpRecord.expirationTime < Date.now()) {
    throw new Error("OTP has expired");
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );

  await Otp.deleteOne({ email });

  return res.status(200).json({
    message: "Email verified successfully",
    user: updatedUser,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new Error("User not found.");
  }

  if (!existingUser.isEmailVerified) {
    throw new Error("Please verify your email first.");
  }

  const matched = await bcrypt.compare(password, existingUser.password);
  if (!matched) {
    throw new Error("Invalid email or password.");
  }

  const token = createJWT(existingUser._id);

  return res.status(200).json({
    message: "Login successful.",
    user: {
      username: existingUser.username,
      email: existingUser.email,
      token,
    },
  });
});
const sendResetPasswordOTP = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User with this email does not exist");
  }

  const otp = generateOTP();
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  await Otp.create({ email, otp, expirationTime });

  await sendEmailWithOTP(email, otp);

  return res.status(200).json({
    message: "OTP sent to your email. Please use it to reset your password.",
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new Error("Email, OTP, and new password are required");
  }

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    throw new Error("Invalid OTP or email");
  }

  if (new Date() > otpRecord.expirationTime) {
    throw new Error("OTP has expired");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  await Otp.deleteOne({ email, otp });

  return res.status(200).json({
    message: "Password reset successfully.",
  });
});

const authController = {
  register,
  verifyEmail,
  login,
  sendResetPasswordOTP,
  resetPassword,
};

export default authController;
