import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
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

export default authRouter;
