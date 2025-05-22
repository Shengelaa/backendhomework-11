const { readFile, writeFile } = require("../../utils");
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  upload,
  deleteFromCloudinary,
} = require("../../config/cloudinary.config");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
app.use(express.json()); // body defined iqneba tuar dawer
app.use(cors());
app.use(express.static("uploads")); // nebismier folders irchev xdeba statikuri da hostze misawvdomi.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const getAllExpenses = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  res.render("pages/home.ejs", { expenses });
};

const getCreateExpenseWeb = async (req, res) => {
  const expenses = await readFile("expenses.json", true);

  res.render("pages/create.ejs", { expenses });
};

const getUpdateExpenseWeb = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const id = Number(req.params.id);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) return res.status(400).send("user not found");

  res.render("pages/update.ejs", { expenses: expenses[index] });
};

const updateExpenseFromWeb = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const id = Number(req.params.id);
  const { expense } = req.body;

  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) return res.status(400).send("expenses not found");

  const updateReq = {};
  if (expense) updateReq.expense = expense;
  if (req.file && req.file.path) updateReq.url = req.file.path;

  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };

  await writeFile("expenses.json", JSON.stringify(expenses, null, 2));
  res.redirect("/");
};

const deleteFromWeb = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const fileName = expenses[index].url?.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  if (fileId) {
    console.log("fileId not found");
    const publicFileId = `uploads/${fileId}`;

    await deleteFromCloudinary(publicFileId);
  }
  expenses.splice(index, 1);
  await writeFile("expenses.json", JSON.stringify(expenses));

  res.redirect("/");
};
const createExpense = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  let expenseFromBody = req.body.expense;

  const lastId = expenses[expenses.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    expense: expenseFromBody,
    createdAt: new Date().toISOString(),
    url: req.file?.path || null,
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", JSON.stringify(expenses));

  res.redirect("/");
  res.status(201).json({
    message: "Expense created successfully",
    data: newExpense,
  });
};

const deleteExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const fileName = expenses[index].url?.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  if (fileId) {
    console.log("fileId not found");
    const publicFileId = `uploads/${fileId}`;

    await deleteFromCloudinary(publicFileId);
  }
  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", JSON.stringify(expenses));

  res
    .status(200)
    .json({ message: "deleted successfully", data: deletedExpense });

  res.json(expenses[index]);
};

const getExpenseById = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const id = Number(req.params.id);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) return res.status(400).send("user not found");

  res.render("pages/details.ejs", { expenses: expenses[index] });
};

const updateExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const Expenses = await readFile("expenses.json", true);
  const expense = req.body?.expense;
  const url = req.file?.path;
  console.log("Uploaded File:", req.file);

  const index = Expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "expense not found" });
  }
  const fileName = Expenses[index].url?.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  if (!fileId) {
    return res.status(404).json({ message: "file Id not found" });
  }
  const publicFileId = `uploads/${fileId}`;
  await deleteFromCloudinary(publicFileId);

  const updateReq = {};
  if (expense) updateReq.expense = expense;
  if (url) updateReq.url = url;

  Expenses[index] = {
    ...Expenses[index],
    ...updateReq,
    updatedAt: new Date().toISOString(),
  };

  await writeFile("expenses.json", JSON.stringify(Expenses));

  res
    .status(200)
    .json({ message: "updated successfully", data: Expenses[index] });
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
  getCreateExpenseWeb,
  getUpdateExpenseWeb,
  updateExpenseFromWeb,
  deleteFromWeb,
};
