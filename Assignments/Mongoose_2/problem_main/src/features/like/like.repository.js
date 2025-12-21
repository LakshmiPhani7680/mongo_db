// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const likeModel = mongoose.model("Like", likeSchema);
export const likeRepo = async (user_id, job_id, model) => {
  // Write your code here
  const existingLike = await likeModel.findOne({
    user: user_id,
    likeable: job_id,
    on_model: model,
  });
  if (existingLike) {
    return null; // User has already liked this item
  }
  const newLike = new likeModel({
    user: user_id,
    likeable: job_id,
    on_model: model,
  });
  return await newLike.save();
};
export const getLikesRepo = async (id, on_model) => {
  // Write your code here
  return await likeModel.find({ likeable: id, on_model: on_model });
};
