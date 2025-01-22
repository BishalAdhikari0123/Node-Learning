import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendEmailWithOTP = async (email, otp) => {
  const mailOptions = {
    from: '"Bishal" <node-class@padxu.com>', 
    to: email, // Receiver's email
    subject: "Your OTP for Email Verification", // Subject line
    html: `
      <p>Dear User,</p>
      <p>Thank you for registering on Bookly. Please use the following OTP to verify your email address:</p>
      <h2 style="color: #2c3e50;">${otp}</h2>
      <p>Note: This OTP is valid for the next 10 minutes.</p>
      <p>Do not share this OTP with anyone.</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("OTP sent: %s", info.messageId);
  return info.messageId;
};
