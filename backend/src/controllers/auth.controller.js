import { User } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../utils/nodemailer.js";

const registerUser = async (req, res) => {
  // Registration logic here
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }
  try {
    // check user existence,
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User with this email already exists",
      });
    }
    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (!newUser) {
      return res
        .status(500)
        .send({ success: false, message: "Failed to register user" });
    }
    // generate token and send in response
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // sending welcome email logic
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: newUser.email,
      subject: "Welcome to Our Service",
      text: `Welcome to Our Website. Your account has been created successfully with email ID: ${newUser.email}`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .send({
        success: true,
        message: "User registered successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server Error: " + error.message });
  }
};

const loginUser = async (req, res) => {
  // Login logic here
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid email or password" });
    }
    // generate token and send in response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .send({
        success: true,
        message: "User logged in successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server Error: " + error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      })
      .send({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server Error: " + error.message });
  }
};

export { registerUser, loginUser, logoutUser };
