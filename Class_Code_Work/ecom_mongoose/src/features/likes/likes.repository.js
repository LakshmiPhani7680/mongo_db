import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";

const LikeModel = mongoose.model("Like", likeSchema);
export class LikeRepository {
  async getLikes(type, id) {
    return await LikeModel.find({
      likeable: new ObjectId(id),
      types: type,
    })
      .populate("user")
      .populate({
        path: "likeable",
        model: type,
      });
  }
  async likeProduct(userId, productId) {
    try {
      const like = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        types: "Product",
      });
      await like.save();
      return like;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Retrieve Failed", 500);
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const like = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        types: "Category",
      });
      await like.save();
      return like;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Retrieve Failed", 500);
    }
  }
}
