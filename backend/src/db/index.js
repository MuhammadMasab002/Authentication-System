import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB and connect to the database
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
    throw error;
  }
};

export default connectDB;
