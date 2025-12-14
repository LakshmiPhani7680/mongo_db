export default class OrderModel {
  constructor(userId, status, createdAt) {
    this.userId = userId;
    this.status = status;
    this.createdAt = createdAt;
  }
}
