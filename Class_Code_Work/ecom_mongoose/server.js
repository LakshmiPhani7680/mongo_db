import express from "express";
import productRoutes from "./src/features/product/product.routes.js";
import userRoutes from "./src/features/user/user.routes.js";
import orderRoutes from "./src/features/order/order.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import cartRoutes from "./src/features/cart/cart.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import swaggerui from "swagger-ui-express";
import swaggerDocument from "./src/swagger.json" with { type: "json" };
import swagger3pointo from "./src/swagger_3.0.json" with { type: "json" };
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import {connectToMongoDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swagger3pointo));
app.use("/api/products", jwtAuth, productRoutes);
app.use("/api/orders", jwtAuth, orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", jwtAuth, cartRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message});
});
app.get((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  // connectToMongoDB();
  connectUsingMongoose();
  console.log(`Server is running on http://localhost:${PORT}`);
});
