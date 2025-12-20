import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";
dotenv.config();
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecomdb";

export const connectUsingMongoose = () => {
  try {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB with Mongoose");
        addCategories();
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB with Mongoose:", error);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB with Mongoose:", error);
    throw error;
  }
};

async function addCategories() {
  const categoryModel = mongoose.model("Category", categorySchema);
  const categories = categoryModel.find();
  if (!categories || (await categories).length == 0) {
    await categoryModel.insertMany([
      {
        name: "Books",
      },
      {
        name: "Clothing",
      },
      {
        name: "Electronics",
      },
    ]);
  }
  console.log("Categories added");
}
