import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["Customer", "Seller"] },
});
