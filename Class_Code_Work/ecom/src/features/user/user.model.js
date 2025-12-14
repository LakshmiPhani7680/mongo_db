import { getDB } from "../../config/mongodb.js";

export class UserModel {
  constructor(username, email, password, type) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.type = type;
  }
  
  static getAllUsers() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: "selleruser",
    email: "seller@ecom.com",
    password: "seller123",
    type: "seller",
  },
];
