import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  desc: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [1, "Price must be greater than 0"],
  },
  sizes: {
    type: [String],
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "At least one category is required"],
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
