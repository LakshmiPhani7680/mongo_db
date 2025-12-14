import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
  name: String,
  desc: String,
  imageUrl: String,
  category: { type: String, enum: [] },
  price: Number,
  sizes: Array,
});
