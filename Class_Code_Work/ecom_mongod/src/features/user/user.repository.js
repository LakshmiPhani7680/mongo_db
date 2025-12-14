import { getDB } from "../../config/mongodb.js";

class UserRepository {
  async signup(userData) {
    try {
      const db = await getDB();
      const collection = await db.collection("users");
      const newUser = collection.insertOne(userData);
      return newUser;
    } catch (err) {
      console.trace(err);
      throw new ApplicationError("Database Insertion Failed", 500);
    }
  }
  async signin(userData) {
    const db = await getDB();
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    return users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
  }
  async findByEmail(emailId) {
    const db = await getDB();
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    return users.find((user) => user.email === emailId);
  }
}

export default UserRepository;
