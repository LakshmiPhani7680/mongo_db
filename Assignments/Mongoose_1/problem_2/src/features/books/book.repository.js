import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

const BookModel = mongoose.model("Book", bookSchema);
export default class BookRepository {
  // -----Change code in below functions only-----

  //book creation
  async createBook(bookData) {
    try {
      const bookCreate = new BookModel(bookData);
      await bookCreate.save();
      return bookCreate;
    } catch (err) {
      console.log(err);
    }
  }

  //filtering the book by id
  async getOne(id) {
    try {
      const getBookById = await BookModel.findById(id);
      if (getBookById) {
        return getBookById;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
