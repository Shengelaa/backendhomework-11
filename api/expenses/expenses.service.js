const { readFile, writeFile } = require("../../utils");

const getAllExpenses = async (req, res) => {
  const expenses = await readFile("expenses.json", true);

  res.json(expenses);
};

const createExpense = async (req, res) => {
  const expenses = await readFile("expenses.json", true);

  const lastId = expenses[expenses.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    product: req.body.product,
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);

  await writeFile("expenses.json", JSON.stringify(expenses));
  res
    .status(201)
    .json({ message: "Expenses created successfully", data: newExpense });
};

const deleteExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  const deletedExpense = expenses.splice(index, 1);

  await writeFile("expenses.json", JSON.stringify(expenses));

  res
    .status(200)
    .json({ message: "deleted successfully", data: deletedExpense });

  res.json(expenses[index]);
};

const getExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "expense not found" });
  }

  res.json(expenses[index]);
};

const updateExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const Expenses = await readFile("expenses.json", true);

  const index = Expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "expense not found" });
  }

  Expenses[index] = {
    ...Expenses[index],
    product: req.body?.product,
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
};
