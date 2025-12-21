// make necessary imports here
import mongoose from "mongoose";
// write your code here
// text (String, required): The text of the review.

// rating (Number, required): The rating given to the author or book, with a minimum value of 1 and a maximum value of 5.

// target (String, enum ["Author", "Book"], required): Specifies whether the review is for an author or a book.

// targetId (mongoose.Schema.Types.ObjectId, refPath "target", required): The ID of the author or book being reviewed.
export const reviewSchema = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  target: { type: String, enum: ["Author", "Book"], required: true },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "target",
    required: true,
  },
});
