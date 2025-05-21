const { Router } = require("express");
const hasDeleteMiddleware = require("../../middlewares/hasAccessOnDelete.middleware.js");
const hasAllrequiredFields = require("../../middlewares/hasAllRequiredFields.js");
const hasUnder3Mb = require("../../middlewares/HasUnder3Mb.middleware.js");

const {
  upload,
  deleteFromCloudinary,
} = require("../../config/cloudinary.config");
const {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require("./expenses.service");

const expenseRoute = Router();

expenseRoute.get("/", getAllExpenses);
expenseRoute.post(
  "/",
  upload.single("avatar"),
  hasAllrequiredFields,
  hasUnder3Mb,
  createExpense
);
expenseRoute.get("/:id", upload.single("avatar"), getExpenseById);
expenseRoute.delete(
  "/:id",
  upload.none(),
  hasDeleteMiddleware,
  deleteExpenseById
);
expenseRoute.put("/:id", upload.single("avatar"), updateExpenseById);

module.exports = expenseRoute;
