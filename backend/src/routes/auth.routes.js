import { Router } from "express";
import {
  isAuthenticated,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendPasswordResetOtp,
  sendVerificationOtp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import authenticateUser from "../middleware/userAuth.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-verify-otp", authenticateUser, sendVerificationOtp);
authRouter.post("/verify-account", authenticateUser, verifyEmail);
authRouter.get("/is-auth", authenticateUser, isAuthenticated);
authRouter.post("/send-reset-otp", sendPasswordResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
