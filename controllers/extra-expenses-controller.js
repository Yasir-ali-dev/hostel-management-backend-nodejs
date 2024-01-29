const { StatusCodes } = require("http-status-codes");
const ExtraExpense = require("../models/ExtraExpenses");
const { BadRequestError, NotFoundError } = require("../errors");

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
    throw new NotFoundError(`Expense not found with id: ${expenseId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, extra_expense: extraExpense });
};

const updateExtraExpense = async (req, res, next) => {
  const expenseId = req.params.extra_expense_Id.slice(1);
  if (!req.body) {
    throw new BadRequestError("provide values to update!");
  }

  const updatedExpense = await ExtraExpense.findByIdAndUpdate(
    expenseId,
    req.body,
    { new: true }
  );
  if (!updatedExpense) {
    throw new NotFoundError(`Expense Not Fount with id: ${expenseId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_expense: updatedExpense });
};

const deleteExtraExpense = async (req, res, next) => {
  const expenseId = req.params.extra_expense_Id.slice(1);
  const deletedExpense = await ExtraExpense.findByIdAndDelete(expenseId, {
    new: true,
  });
  if (!deletedExpense) {
    throw new NotFoundError(`Expense not found with id: ${expenseId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_expense: deletedExpense });
};

module.exports = {
  getAllExtraExpenses,
  createExtraExpense,
  getExtraExpense,
  updateExtraExpense,
  deleteExtraExpense,
};
