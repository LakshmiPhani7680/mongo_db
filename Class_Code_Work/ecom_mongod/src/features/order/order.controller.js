import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async placeOrder(req, res) {
    try {
      const userId = req.body.userId;
      const newOrder = await this.orderRepository.placeOrder(userId);
      res
        .status(201)
        .json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
      console.trace(err);
      res.status(500).json({ message: "Failed to place order" });
    }
  }
}
