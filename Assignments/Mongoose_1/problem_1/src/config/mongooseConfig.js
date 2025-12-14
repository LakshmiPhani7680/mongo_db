// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
const url = "mongodb://localhost:27017";
export const connectUsingMongoose = async () => {
  // write your code here
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected using mongoose");
    })
    .catch((err) => {
      console.log("Error while connecting mongoose db");
    });
};
