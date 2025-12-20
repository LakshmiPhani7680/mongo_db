import mongoose from "mongoose";
import BookRepository from "./book.repository.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //------change code in below functions only--------

  // creation of book
  createBook = async (req, res) => {
    try {
      const data = req.body;
      const bookData = await this.bookRepository.createBook(data);
      if (bookData) {
        res.status(201).json(bookData);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Did not get created");
    }
  };

  // filtering of book by id
  getOne = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await this.bookRepository.getOne(bookId);
      if (book) {
        res.status(200).send(book);
      } else {
        res.status(404).send("Book Not Found");
      }
    } catch (err) {
      res.status(500).send("Something Happened");
    }
  };
}
