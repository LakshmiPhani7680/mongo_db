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
      return await UserMongooseModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while signin from mongoose");
    }
  }

  async findByEmail(email) {
    try {
      console.log("Finding user by email in mongoose:", email);
      const user = await UserMongooseModel.findOne({ email });
      console.log("User found:", user);
      return user;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Error while finding user using email from mongoose"
      );
    }
  }

  async updatePassword(userId, newPassword) {
    try {
      const user = await UserMongooseModel.findById(userId);

      if (!user) {
        throw new ApplicationError("User not found");
      }

      user.password = newPassword; // should be hashed
      await user.save();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while updating password from mongoose");
    }
  }
}
