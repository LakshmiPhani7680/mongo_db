import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

export const connectUsingMongoose = () => {
  try {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB with Mongoose");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB with Mongoose:", error);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB with Mongoose:", error);
    throw error;
  }
};
