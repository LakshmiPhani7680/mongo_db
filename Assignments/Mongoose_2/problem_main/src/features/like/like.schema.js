// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
// user (mongoose ObjectId, mandatory): Reference 'User' to identify the user who likes.

// likeable (mongoose ObjectId, mandatory): Reference the item being liked.

// on_model (string, mandatory): Specify whether the like is for a 'User' or a 'Job'.

export const likeSchema = new mongoose.Schema({
  // Write your code here
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "on_model",
  },
  on_model: {
    type: String,
    required: true,
    enum: ["User", "Job"],
  },
});
