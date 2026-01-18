import { User } from "../models/auth.model.js";

const getUserProfile = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).send({ success: false, message: "User not found." });
  }
  try {
    const userFromDb = await User.findById(user._id).select(
      "-password -__v -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt",
    );
    if (!userFromDb) {
      return res
        .status(404)
        .send({ success: false, message: "User not found in database." });
    }
    return res.status(200).send({
      success: true,
      message: "User profile fetched.",
      data: userFromDb,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server error: " + error.message });
  }
};

export { getUserProfile };
