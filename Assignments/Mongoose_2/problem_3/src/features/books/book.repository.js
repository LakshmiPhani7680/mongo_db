// No need to change the pre-written code.

// Just implement addReviewToTarget function.

import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";
import { reviewSchema } from "./review.schema.js";
import { authorSchema } from "./author.schema.js";

// creating model from schema.
const booksModel = mongoose.model("Book", bookSchema);

// creating model for review.
const reviewModel = mongoose.model("Review", reviewSchema);

// creating model for author.
const authorsModel = mongoose.model("Author", authorSchema);

export default class BookRepository {
  async createBook(bookData) {
    const book = new booksModel(bookData);
    const savedBook = await book.save();
    return savedBook;
  }

  async addReviewToTarget(targetId, target, text, rating) {
    const review = new reviewModel({
      text,
      rating,
      target,
      targetId,
    });
    const savedReview = await review.save();
    // 2. Find the target entity (Author or Book)
    let targetModel;
    if (target === "Author") {
      targetModel = authorsModel;
    } else if (target === "Book") {
      targetModel = booksModel;
    } else {
      throw new Error("Invalid target type");
    }

    const targetEntity = await targetModel.findById(targetId);
    if (!targetEntity) {
      throw new Error(`${target} not found`);
    }

    // 3. Push the review's _id to the target's reviews array and save
    targetEntity.reviews.push(savedReview._id);
    await targetEntity.save();

    return savedReview;
  }

  async getOne(id) {
    const book = await booksModel.findById(id);
    return book;
  }

  async listBooksByGenre(genre) {
    const books = await booksModel.find({ genre });
    return books;
  }

  async updateBookAvailability(bookId, quantity) {
    console.log(bookId);
    const book = await booksModel.findById(bookId);

    // Calculate the new availableCopies value
    const newAvailableCopies = book.availableCopies + quantity;

    // Update the availableCopies field and save the book
    book.availableCopies = newAvailableCopies;

    await book.save();
    return book;
  }

  async deleteBookById(bookId) {
    const deletedBook = await booksModel.findByIdAndRemove(bookId);
    return deletedBook;
  }

  async createAuthor(authorData) {
    const author = new authorsModel(authorData);
    const savedAuthor = await author.save();
    return savedAuthor;
  }

  async addAuthorToBook(bookId, authorId) {
    const book = await booksModel.findById(bookId);
    const author = await authorsModel.findById(authorId);

    if (!book || !author) {
      throw new Error("Book or author not found");
    }
    book.authors.push(author._id);
    author.books.push(book._id);

    await book.save();
    await author.save();

    return { book, author };
  }

  async listAuthorsByBook(bookId) {
    const book = await booksModel.findById(bookId).populate("authors");
    if (!book) {
      throw new Error("Book not found");
    }
    return book.authors;
  }

  async listBooksByAuthor(authorId) {
    const author = await authorsModel.findById(authorId).populate("books");
    if (!author) {
      throw new Error("Author not found");
    }
    return author.books;
  }
}
