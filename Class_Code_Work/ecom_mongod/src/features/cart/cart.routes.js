import CartController from "./cart.controller.js";
import express from "express";

const router = express.Router();
const cartController = new CartController();
router.post("/add", cartController.addItem);
router.get("/items", cartController.getItems);
router.delete("/item/:id", cartController.deleteItem);
export default router;
