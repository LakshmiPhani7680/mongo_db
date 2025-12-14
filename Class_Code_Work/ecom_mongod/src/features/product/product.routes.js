import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
const router = express.Router();
const productController = new ProductController();

router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
router.get("/:id", (req, res) => {
  productController.getProductById(req, res);
});
router.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
router.post("/rate", (req, res) => {
  console.log("Rate endpoint hit", req.body);
  productController.rateProduct(req, res);
});
router.get("/filter", (req, res) => productController.filterProducts(req, res));
router.post("/:id/rate", (req, res) => productController.rateProduct(req, res));
export default router;
