import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  // static getById(id) {
  //   return products.find((product) => product.id === id);
  // }

  // static addProduct(product) {
  //   product.id = products.length + 1;
  //   products.push(product);
  //   return product;
  // }

  // static getAll() {
  //   return products;
  // }

  // static filterProducts(minPrice, maxPrice, category) {
  //   // Implement filtering logic based on criteria
  //   return products.filter((product) => {
  //     let isValid = true;
  //     if (minPrice !== undefined) {
  //       isValid = isValid && product.price >= minPrice;
  //     }
  //     if (maxPrice !== undefined) {
  //       isValid = isValid && product.price <= maxPrice;
  //     }
  //     if (category) {
  //       isValid = isValid && product.category === category;
  //     }
  //     return isValid;
  //   });
  // }
  // static rateProduct(userId, productId, rating) {
  //   const user = UserModel.getAllUsers().find((u) => u.id === userId);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const product = this.getById(productId);
  //   if (!product) {
  //     throw new Error("Product not found");
  //   }
  //   if (!product.ratings) {
  //     product.ratings = [];
  //     product.ratings.push({ userId, rating });
  //   } else {
  //     const existingRatingIndex = product.ratings.findIndex(
  //       (r) => r.userId === userId
  //     );
  //     if (existingRatingIndex !== -1) {
  //       product.ratings[existingRatingIndex].rating = rating;
  //     } else {
  //       product.ratings.push({ userId, rating });
  //     }
  //   }
  // }
}

var products = [
  new ProductModel(
    1,
    "T-Shirt",
    "A comfortable cotton t-shirt",
    19.99,
    "https://example.com/tshirt.jpg",
    "Apparel",
    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    2,
    "Jeans",
    "Stylish blue jeans",
    49.99,
    "https://example.com/jeans.jpg",
    "Apparel",
    ["30", "32", "34", "36"]
  ),
  new ProductModel(
    3,
    "Sneakers",
    "Comfortable running sneakers",
    89.99,
    "https://example.com/sneakers.jpg",
    "Footwear",
    ["8", "9", "10", "11"]
  ),
  new ProductModel(
    4,
    "Backpack",
    "Durable backpack for everyday use",
    39.99,
    "https://example.com/backpack.jpg",
    "Accessories",
    []
  ),
];
