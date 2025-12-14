import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../error-handler/applicationError.js";

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
      const db = await getDB();
      const collection = await db.collection(this.collectionName);
      const newProduct = await collection.insertOne(product);
      return newProduct;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Insertion Failed", 500);
    }
  }

  async getAll() {
    try {
      const db = await getDB();
      console.log("DB obtained in repository", db);
      const collection = await db.collection(this.collectionName);
      console.log("Collection obtained in repository", collection);
      const products = await collection.find({}).toArray();
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
      const db = await getDB();
      const collection = await db.collection(this.collectionName);
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      if (!user) {
        throw new Error("User not found");
      }
      console.log("Rating productId:", productId);
      const product = this.getById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      // if (!product.ratings) {
      //   product.ratings = [];
      //   product.ratings.push({ userId, rating });
      // } else {
      //   const existingRatingIndex = product.ratings.findIndex(
      //     (r) => r.userId === userId
      //   );
      //   if (existingRatingIndex !== -1) {
      //     product.ratings[existingRatingIndex].rating = rating;
      //   } else {
      //     product.ratings.push({ userId, rating });
      //   }
      // }
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Update Failed", 500);
    }
  }
}

export default ProductRepository;
