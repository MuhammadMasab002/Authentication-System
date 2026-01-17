import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  //  || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid token." });
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid token: " + error.message });
  }
};

export default authenticateUser;
