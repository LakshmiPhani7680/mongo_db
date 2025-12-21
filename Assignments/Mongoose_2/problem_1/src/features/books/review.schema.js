// Please don't change the pre-written code
// Import the necessary modules here(if required)

import mongoose from "mongoose";

// text: A required string field for the review text.

// rating: A required number field for the review rating, with a minimum value of 1 and a maximum value of 5.

// book: A reference field (ObjectId) that associates each review with a book using Mongoose's one-to-many relationship, with a reference to the 'Book' model.

export const reviewSchema = new mongoose.Schema({
  // Write your code here
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    // required: true,
  },
});
