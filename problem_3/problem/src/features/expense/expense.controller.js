import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const expense = req.body;
      const newExpense = await this.expenseRepository.addExpense(expense);
      res.status(201).json(newExpense);
    } catch (error) {
      console.error("Error in add expense controller:", error);
      res.status(500).json({ error: "Failed to add expense" });
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const expense = await this.expenseRepository.getOne(id);
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.status(200).json(expense);
    } catch (error) {
      console.error("Error in get one expense controller:", error);
      res.status(500).json({ error: "Failed to fetch expense" });
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      console.error("Error in get all expenses controller:", error);
      res.status(500).json({ error: "Failed to fetch expenses" });
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const id = req.params.id;
      const tag = req.body.tag;
      const result = await this.expenseRepository.addTagToExpense(id, tag);
      if (!result) {
        return res
          .status(404)
          .json({ error: "Expense not found or tag not added" });
      }
      res.status(200).json({ message: "Tag added successfully" });
    } catch (error) {
      console.error("Error in add tag to expense controller:", error);
      res.status(500).json({ error: "Failed to add tag to expense" });
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const criteria = req.query;
      const filteredExpenses = await this.expenseRepository.filterExpenses(
        criteria
      );
      res.status(200).json(filteredExpenses);
    } catch (error) {
      console.error("Error in filter expenses controller:", error);
      res.status(500).json({ error: "Failed to filter expenses" });
    }
  };
}
