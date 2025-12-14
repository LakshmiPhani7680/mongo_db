import CartModel from "./cart.model.js";

export default class CartController {
  addItem(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    const newItem = CartModel.addItem(productId, userId, quantity);
    res.status(201).json({ message: "Item added to cart", item: newItem });
  }
  getItems(req, res) {
    const userId = req.userId;
    const items = CartModel.getItemsByUserId(userId);
    res.status(200).json({ items: items });
  }
  deleteItem(req, res) {
    const itemId = parseInt(req.params.itemId);
    const userId = req.userId;
    const success = CartModel.deleteItem(itemId, userId);
    if (success) {
      res.status(200).json({ message: "Item deleted from cart" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  }
}
