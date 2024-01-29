const { StatusCodes } = require("http-status-codes");
const MessExpenses = require("../models/MessExpenses");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllMessExpenses = async (req, res, next) => {
  const allExpenses = await MessExpenses.find({});
  res.status(StatusCodes.OK).json({ mess_expenses: allExpenses, status: true });
};

const createMessExpense = async (req, res, next) => {
  const { description, amount, date } = req.body;
  if (!description || !amount || !date) {
    throw new BadRequestError(
      "please provide description, amount or date are required"
    );
  }
  const messExpense = await MessExpenses.create({
    description,
    amount,
    date,
    totalExpenses: 0,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: true, mess_expense: messExpense });
};

const getMessExpense = async (req, res, next) => {
  const expenseId = req.params.mess_expense_Id.slice(1);
  const messExpense = await MessExpenses.findById(expenseId);
  if (!messExpense) {
    throw new NotFoundError(`Expense not found with id: ${expenseId}`);
  }
  res.status(StatusCodes.OK).json({ status: true, mess_expense: messExpense });
};

const updateMessExpense = async (req, res, next) => {
  const expenseId = req.params.mess_expense_Id.slice(1);

  const updatedExpense = await MessExpenses.findByIdAndUpdate(
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

const deleteMessExpense = async (req, res, next) => {
  const expenseId = req.params.mess_expense_Id.slice(1);
  const deletedExpense = await MessExpenses.findByIdAndDelete(expenseId, {
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
  getAllMessExpenses,
  createMessExpense,
  getMessExpense,
  updateMessExpense,
  deleteMessExpense,
};
