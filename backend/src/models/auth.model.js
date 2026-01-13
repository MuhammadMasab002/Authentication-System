import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

export const User = mongoose.model("User", userSchema);
