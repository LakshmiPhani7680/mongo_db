import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const result = await db
        .collection(this.collectionName)
        .insertOne(expense);
      return await db
        .collection(this.collectionName)
        .findOne({ _id: result.insertedId }); // Return the newly created expense
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const expense = await db
        .collection(this.collectionName)
        .findOne({ _id: new ObjectId(id) });
      return expense; // Return the found expense
    } catch (error) {
      console.error("Error fetching expense:", error);
      throw error;
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const expenses = await db
        .collection(this.collectionName)
        .find({})
        .toArray();
      return expenses; // Return all expenses
    } catch (error) {
      console.error("Error fetching all expenses:", error);
      throw error;
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const result = await db.collection(this.collectionName).updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { tags: tag } } // Use $addToSet to avoid duplicates
      );
      return result.modifiedCount > 0; // Return true if the tag was added
    } catch (error) {
      console.error("Error adding tag to expense:", error);
      throw error;
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();
      const query = {};
      if (criteria.minAmount || criteria.maxAmount) {
        query.amount = {};
        if (criteria.minAmount)
          query.amount.$gte = parseFloat(criteria.minAmount);
        if (criteria.maxAmount)
          query.amount.$lte = parseFloat(criteria.maxAmount);
      }
      if (criteria.isRecurring !== undefined) {
        query.isRecurring = criteria.isRecurring === "true";
      }
      const expenses = await db
        .collection(this.collectionName)
        .find(query)
        .toArray();
      return expenses; // Return filtered expenses
    } catch (error) {
      console.error("Error filtering expenses:", error);
      throw error;
    }
  }
}

export default ExpenseRepository;
