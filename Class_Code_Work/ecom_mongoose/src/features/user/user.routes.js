import { UserController } from "./user.controller.js";
import express from "express";
const router = express.Router();
const userController = new UserController();
router.post("/signup", (req, res) => {
  userController.signup(req, res);
});
router.post("/signin", (req, res) => {
  userController.signin(req, res);
});
router.put("/reset-password", (req, res) => {
  userController.resetPassword(req, res);
});

export default router;
