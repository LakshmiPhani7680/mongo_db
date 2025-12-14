import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../error-handler/applicationError.js";

const UserMongooseModel = mongoose.model("User", userSchema);

export default class UserMongooseRepository {
  constructor() {}
  async signup(user) {
    try {
      const newUser = new UserMongooseModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while signup from mongoose");
    }
  }
  async signin(email, password) {
    try {
      return await new UserMongooseModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while signin from mongoose");
    }
  }

  async findByEmail(emailId) {
    try {
      return await new UserMongooseModel.findOne({ emailId });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Error while finding user using email from mongoose"
      );
    }
  }
}
