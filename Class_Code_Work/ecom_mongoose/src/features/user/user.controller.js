// import ApplicationError from "../error-handler/applicationError.js";
// import { UserModel } from "./user.model.js";
// import jwt from "jsonwebtoken";
// import UserRepository from "./user.repository.js";
// import UserMongooseRepository from "./user.repoMongoose.js";
// import bcrypt from "bcrypt";
// const JWT_SECRET = process.env.JWT_SECRET;
// export class UserController {
//   constructor() {
//     // this.userRepository = new UserRepository();
//     this.userMongooseRepository = new UserMongooseRepository();
//   }
//   async signup(req, res) {
//     try {
//       const { name, email, password, type } = req.body;
//       if (!name || !email || !password || !type) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
//       console.log(req.body);
//       // const user = UserModel.signup(name, email, password, type);
//       const hashPassword = await bcrypt.hash(password, 12);
//       const user = new UserModel(name, email, hashPassword, type);
//       // const newUser = await this.userRepository.signup(user);
//       const newUser = await this.userMongooseRepository.signup(user);
//       res.status(201).json({ message: "User registered successfully", user });
//     } catch (err) {
//       throw new ApplicationError("Signup Failed", 500);
//     }
//   }
//   async signin(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (email && password) {
//         // const user = UserModel.signin(username, password);
//         const user = new UserModel(null, email, password, null);
//         // this.userRepository.signin(user);
//         // const existingUser = await this.userRepository.findByEmail(email);
//         const existingUser = await this.userMongooseRepository.findByEmail(
//           email
//         );
//         console.log("Existing user:", existingUser);
//         if (existingUser) {
//           const result = await bcrypt.compare(password, existingUser.password);
//           console.log("bcrypt compare result:", result);
//           if (result) {
//             const token = jwt.sign(
//               { id: user.id, email: user.email, type: user.type },
//               `${JWT_SECRET}`,
//               {
//                 expiresIn: "1h",
//               }
//             );
//             res.cookie("jwtToken", token, { httpOnly: true });
//             res
//               .status(200)
//               .json({ message: "Signin successful", token: token });
//           } else {
//             res.status(401).json({ message: "password" });
//           }
//         } else {
//           res.status(401).json({ message: "Invalid email" });
//         }
//       } else {
//         throw new ApplicationError("Username and password are required");
//       }
//     } catch (err) {
//       console.trace(err);
//     }
//     // console.log(user);
//   }
//   async resetPassword(req, res) {
//     try {
//       const { email, oldPassword, newPassword } = req.body;
//       if (!email || !oldPassword || !newPassword) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
//       // const user = UserModel.resetPassword(email, oldPassword, newPassword);
//       console.log("Reset password request for:", email);
//       console.log("Old Password:", oldPassword);
//       console.log("New Password:", newPassword);
//       const user = new UserModel(null, email, oldPassword, null);
//       // const existingUser = await this.userRepository.findByEmail(email);
//       const existingUser = await this.userMongooseRepository.findByEmail(email);
//       console.log("Existing user for reset:", existingUser);
//       if (existingUser) {
//         const result = await bcrypt.compare(oldPassword, existingUser.password);
//         console.log("bcrypt compare result for reset:", result);
//         if (result) {
//           const hashPassword = await bcrypt.hash(newPassword, 12);
//           // existingUser.password = hashPassword;
//           // await this.userRepository.updateUser(existingUser);
//           const userId = existingUser._id;
//           await this.userMongooseRepository.updatePassword(
//             userId,
//             hashPassword
//           );
//           res.status(200).json({ message: "Password reset successful" });
//         } else {
//           res.status(401).json({ message: "Old password is incorrect" });
//         }
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (err) {
//       throw new ApplicationError("Reset Password Failed", 500);
//     }
//   }
// }
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationError from "../error-handler/applicationError.js";
import UserMongooseRepository from "./user.repoMongoose.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserController {
  constructor() {
    this.userMongooseRepository = new UserMongooseRepository();
  }

  // ================= SIGNUP =================
  async signup(req, res) {
    try {
      const { email, password, type, username } = req.body;

      if (!username || !email || !password || !type) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // check if user already exists
      const existingUser = await this.userMongooseRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      const userData = {
        username,
        email,
        password: hashedPassword,
        type,
      };

      const newUser = await this.userMongooseRepository.signup(userData);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          type: newUser.type,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Signup failed" });
    }
  }

  // ================= SIGNIN =================
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const existingUser = await this.userMongooseRepository.findByEmail(email);

      if (!existingUser) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          type: existingUser.type,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("jwtToken", token, { httpOnly: true });

      res.status(200).json({
        message: "Signin successful",
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Signin failed" });
    }
  }

  // ================= RESET PASSWORD =================
  async resetPassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;

      if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await this.userMongooseRepository.findByEmail(email);

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await this.userMongooseRepository.updatePassword(
        existingUser._id,
        hashedPassword
      );

      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Reset password failed" });
    }
  }
}
