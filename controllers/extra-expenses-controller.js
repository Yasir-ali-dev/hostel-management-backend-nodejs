const { StatusCodes } = require("http-status-codes");
const ExtraExpense = require("../models/ExtraExpenses");
const { BadRequestError } = require("../errors");
const { uid } = require("uid");
const { NotBeforeError } = require("jsonwebtoken");

const getAllExtraExpenses = async (req, res, next) => {
  const allExpenses = await ExtraExpense.find({});
  res
    .status(StatusCodes.OK)
    .json({ extra_expenses: allExpenses, status: true });
};

const createExtraExpense = async (req, res, next) => {
  const { description, amount, date } = req.body;
  if (!description || !amount || !date) {
    throw new BadRequestError(
      "please provide description, amount or date are required"
    );
  }
  const extraExpense = await ExtraExpense.create({
    description,
    amount,
    date,
    totalExpenses: 0,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ status: true, extra_expense: extraExpense });
};

const getExtraExpense = async (req, res, next) => {
  const expenseId = req.params.extra_expense_Id.slice(1);
  const extraExpense = await ExtraExpense.findById(expenseId);
  if (!extraExpense) {
    throw new NotBeforeError(`Expense not found with id: ${expenseId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, extra_expense: extraExpense });
};

const updateExtraExpense = (req, res, next) => {
  console.log(req.params);

  res.json(req.params);
};
const deleteExtraExpense = (req, res, next) => {
  console.log(req.params);
  res.json(req.params);
};

module.exports = {
  getAllExtraExpenses,
  createExtraExpense,
  getExtraExpense,
  updateExtraExpense,
  deleteExtraExpense,
};
