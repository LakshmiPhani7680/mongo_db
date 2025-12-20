import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const productModel = mongoose.model("Product", productSchema);
const reviewModel = mongoose.model("Review", reviewSchema);
const categoryModel = mongoose.model("Category", categorySchema);
class ProductRepository {
  constructor() {
    this.collectionName = "products";
  }
  async getById(id) {
    try {
      console.log("Getting product by ID:", id);
      const db = await getDB();
      const collection = await db.collection(this.collectionName);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Retrieve Failed", 500);
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new productModel(product);
      const savedProduct = await newProduct.save();

      await categoryModel.updateMany(
        { _id: { $in: product.category } },
        { $push: { products: savedProduct._id } }
      );

      return savedProduct;
    } catch (err) {
      // IMPORTANT: preserve mongoose error
      if (err.name === "ValidationError") {
        throw err;
      }
      throw new ApplicationError(err.message, 500);
    }
  }

  async getAll() {
    try {
      // const db = await getDB();
      // console.log("DB obtained in repository", db);
      // const collection = await db.collection(this.collectionName);
      // console.log("Collection obtained in repository", collection);
      // const products = await collection.find({}).toArray();
      // return products;
      const products = await productModel.find({});
      return products;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Retrieve Failed", 500);
    }
  }

  async filterProducts(minPrice, maxPrice, category) {
    const products = await this.getAll();
    // Implement filtering logic based on criteria
    return products.filter((product) => {
      let isValid = true;
      if (minPrice !== undefined) {
        isValid = isValid && product.price >= minPrice;
      }
      if (maxPrice !== undefined) {
        isValid = isValid && product.price <= maxPrice;
      }
      if (category) {
        isValid = isValid && product.category === category;
      }
      return isValid;
    });
  }
  async rateProduct(userId, productId, rating) {
    try {
      const productToUpdate = await productModel.findById(productId);
      if (!productToUpdate) {
        throw new ApplicationError("Product not found", 404);
      }
      const reviewUser = await reviewModel.findOne({
        product: productId,
        user: userId,
      });
      if (reviewUser) {
        // Update existing review
        reviewUser.rating = rating;
        await reviewUser.save();
      } else {
        // Create new review
        const newReview = new reviewModel({
          product: new ObjectId(productId),
          user: new ObjectId(userId),
          rating: rating,
        });
        await newReview.save();
        productToUpdate.reviews.push(newReview._id);
        await productToUpdate.save();
      }
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Update Failed", 500);
    }
  }
}

export default ProductRepository;
