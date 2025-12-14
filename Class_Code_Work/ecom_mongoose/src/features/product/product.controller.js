import ProductModel from "./product.models.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    const products = await this.productRepository.getAll();
    res.status(200).send(products);
  }
  async getProductById(req, res) {
    const id = parseInt(req.params.id);
    const product = await this.productRepository.getById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
  async addProduct(req, res) {
    console.log(req.body);
    const { name, desc, price, imageUrl, category, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes,
      imageUrl: imageUrl || "",
      desc: desc || "",
      category: category || "General",
    };
    const record = await this.productRepository.addProduct(newProduct);
    res
      .status(201)
      .send({ message: "Product added successfully", product: record });
  }
  async rateProduct(req, res) {
    const { userId, productId, rating } = req.body;
    console.log("Rating request received:", { userId, productId, rating });
    try {
      await this.productRepository.rateProduct(userId, productId, rating);
      res.status(200).send({ message: "Product rated successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async filterProducts(req, res) {
    const { minPrice, maxPrice, category } = req.query;
    const filteredProducts = await this.productRepository.filterProducts(
      minPrice ? parseFloat(minPrice) : undefined,
      maxPrice ? parseFloat(maxPrice) : undefined,
      category
    );
    res.status(200).send(filteredProducts);
  }
}
