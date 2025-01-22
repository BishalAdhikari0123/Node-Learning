import { Router } from "express";
import validate from "../middleware/validate.js"; 
import authValidation from "../validation/auth.js"; 
import authController from "../controller/authController.js"; 
import resetPasswordValidation from "../validation/passwordManager.js"
const authRouter = Router();

authRouter.post(
  "/register", 
  validate(authValidation.register),
  authController.register 
);

authRouter.post(
  "/login", 
  validate(authValidation.login),
  authController.login 
);

authRouter.get(
  "/verify-email/:token", 
  authController.verifyEmail 
);

const resetPasswordRouter = Router();

// Route to send OTP for password reset
resetPasswordRouter.post(
  "/forgot-password", 
  validate(resetPasswordValidation.sendOTP), 
  authController.sendResetPasswordOTP
);

// Route to reset the password
resetPasswordRouter.post(
  "/reset-password", 
  validate(resetPasswordValidation.resetPassword), 
  authController.resetPassword
);




export {resetPasswordRouter, authRouter};

