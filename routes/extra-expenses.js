const express = require("express");
const {
  getAllExtraExpenses,
  createExtraExpense,
  getExtraExpense,
  updateExtraExpense,
  deleteExtraExpense,
} = require("../controllers/extra-expenses-controller");

const router = express.Router();

router
  .route("/extra_expenses")
  .get(getAllExtraExpenses)
  .post(createExtraExpense);

router
  .route("/extra_expenses/:extra_expense_Id")
  .get(getExtraExpense)
  .patch(updateExtraExpense)
  .delete(deleteExtraExpense);

module.exports = router;
