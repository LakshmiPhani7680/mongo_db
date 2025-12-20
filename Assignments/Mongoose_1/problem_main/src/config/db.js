import mongoose from "mongoose";

const baseUrl = process.env.MONGODB || "0.0.0.0:27017";

export const connectToDb = async () => {
  try {
    console.log(`Connecting to MongoDB at ${baseUrl}...`);
    await mongoose.connect(`mongodb://${baseUrl}/book`);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
