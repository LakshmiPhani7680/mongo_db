import ApplicationError from "../error-handler/applicationError.js";
import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET;
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signup(req, res) {
    try {
      const { name, email, password, type } = req.body;
      if (!name || !email || !password || !type) {
        return res.status(400).json({ message: "All fields are required" });
      }
      console.log(req.body);
      // const user = UserModel.signup(name, email, password, type);
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, hashPassword, type);
      const newUser = await this.userRepository.signup(user);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      throw new ApplicationError("Signup Failed", 500);
    }
  }
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        // const user = UserModel.signin(username, password);
        const user = new UserModel(null, email, password, null);
        // this.userRepository.signin(user);
        const existingUser = await this.userRepository.findByEmail(email);
        console.log("Existing user:", existingUser);
        if (existingUser) {
          const result = await bcrypt.compare(password, existingUser.password);
          console.log("bcrypt compare result:", result);
          if (result) {
            const token = jwt.sign(
              { id: user.id, email: user.email, type: user.type },
              `${JWT_SECRET}`,
              {
                expiresIn: "1h",
              }
            );
            res.cookie("jwtToken", token, { httpOnly: true });
            res
              .status(200)
              .json({ message: "Signin successful", token: token });
          } else {
            res.status(401).json({ message: "password" });
          }
        } else {
          res.status(401).json({ message: "Invalid email" });
        }
      } else {
        throw new ApplicationError("Username and password are required");
      }
    } catch (err) {
      console.trace(err);
    }
    // console.log(user);
  }
}
