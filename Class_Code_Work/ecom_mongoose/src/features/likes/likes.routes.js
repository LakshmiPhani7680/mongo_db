import express from "express";
const router = express.Router();
import { LikeController } from "./likes.controller.js";

const likeController = new LikeController();
// Route to like a post
router.post("/:postId/like", (req, res) =>
  likeController.likeProduct(req, res)
);

export default router;
