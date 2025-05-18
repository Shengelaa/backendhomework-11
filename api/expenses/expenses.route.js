const { Router } = require("express");
const hasDeleteMiddleware = require("../../middlewares/hasAccessOnDelete.middleware.js");
const hasAllrequiredFields = require("../../middlewares/hasAllRequiredFields.js");
const {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require("./expenses.service");

const expenseRoute = Router();

expenseRoute.get("/", getAllExpenses);
expenseRoute.post("/", hasAllrequiredFields, createExpense);
expenseRoute.get("/:id", getExpenseById);
expenseRoute.delete("/:id", hasDeleteMiddleware, deleteExpenseById);
expenseRoute.put("/:id", updateExpenseById);

module.exports = expenseRoute;
