import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URL = `${process.env.DB_URL}`;
let client;

export const connectToMongoDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(URL);
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client.db("ecomdb");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const getDB = async () => {
  if (!client) {
    console.log("Mongo client not found, connecting...");
    await connectToMongoDB();
  }
  return client.db("ecomdb");
};

export const getClient = () => {
  return client;
};
