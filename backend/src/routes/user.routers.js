import { Router } from "express";
import authenticateUser from "../middleware/userAuth.js";
import { getUserProfile } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", authenticateUser, getUserProfile);

export default userRouter;
