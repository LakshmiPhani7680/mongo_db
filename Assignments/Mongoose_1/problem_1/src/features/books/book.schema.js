// Please don't change the pre-written code
// make the necessary imports for creating book schema named 'bookSchema'
import mongoose from "mongoose";
// Start writing your code here
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Mystery",
      "Fantasy",
      "Other",
    ],
    required: true,
  },
  copies: {
    min: 1,
    type: Number,
    required: true,
  },
  availableCopies: {
    min: 0,
    type: Number,
    required: true,
  },
});
export default bookSchema;
