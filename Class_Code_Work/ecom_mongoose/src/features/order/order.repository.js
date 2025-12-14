import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collectionName = "orders";
  }
  async getItems(userId, session) {
    try {
      const db = await getDB();
      const collection = await db.collection("cartItems");
      const cartItems = await collection
        .aggregate(
          [
            { $match: { userId: new ObjectId(userId) } },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo",
              },
            },
            {
              $unwind: "$productInfo",
            },
            {
              $addFields: {
                totalAmount: { $multiply: ["$quantity", "$productInfo.price"] },
              },
            },
          ],
          { session }
        )
        .toArray();
      return cartItems;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Retrieve Failed", 500);
    }
  }
  async placeOrder(userId) {
    const client = await getClient();
    const session = client.startSession();
    try {
      const db = await getDB();
      session.startTransaction();
      const collection = await db.collection(this.collectionName);
      const cartItems = await this.getItems(userId, session);
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      const newOrder = new OrderModel(
        new ObjectId(userId),
        "PLACED",
        new Date()
      );
      await db.collection("orders").insertOne(newOrder, { session });
      for (let item of cartItems) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productId },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });
      await session.commitTransaction();
      session.endSession();
      return { order: newOrder, totalAmount, items: cartItems };
    } catch (err) {
      console.trace(err);
      await session.abortTransaction();
      session.endSession();
      throw new ApplicationError("Database Insertion Failed", 500);
    }
  }
}
