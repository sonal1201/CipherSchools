import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const isConnected = await mongoose.connect(process.env.MONGO_URI);

    if (isConnected) {
      console.log("MongoDb is connected");
    }
  } catch (error) {
    console.log(error);
    console.log("failed to connect DB");
  }
};
