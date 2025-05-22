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
  getCreateExpenseWeb,
  getUpdateExpenseWeb,
  updateExpenseFromWeb,
  deleteFromWeb,
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

expenseRoute.post("/:id/delete", deleteFromWeb);

expenseRoute.get("/:id/update", getUpdateExpenseWeb);

expenseRoute.get("/create", getCreateExpenseWeb);
expenseRoute.post(
  "/:id/updatee",
  upload.single("avatar"),
  updateExpenseFromWeb
);

expenseRoute.post(
  "/create",
  upload.single("avatar"),
  hasAllrequiredFields,
  hasUnder3Mb,
  getCreateExpenseWeb
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
