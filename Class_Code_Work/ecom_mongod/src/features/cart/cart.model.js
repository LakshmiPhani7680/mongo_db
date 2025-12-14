export default class CartModel {
  constructor(id, productId, userId, quantity) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }
  static addItem(productId, userId, quantity) {
    let id = cartItems.length + 1;
    var cartItem = new CartModel(productId, userId, quantity);
    cartItems.push(cartItem);

    return cartItem;
  }
  static getItemsByUserId(userId) {
    return cartItems.filter((item) => item.userId === userId);
  }
  static deleteItem(itemId, userId) {
    const index = cartItems.findIndex(
      (item) => item.id === itemId && item.userId === userId
    );
    if (index !== -1) {
      cartItems.splice(index, 1);
      return true;
    }
    return false;
  }
}

var cartItems = [new CartModel(1, 1, 1, 2), new CartModel(2, 2, 1, 1)];
