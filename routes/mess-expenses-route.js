const express = require("express");
const {
  getAllMessExpenses,
  createMessExpense,
  getMessExpense,
  updateMessExpense,
  deleteMessExpense,
} = require("../controllers/mess-expenses-controller");

const router = express.Router();

router.route("/").get(getAllMessExpenses).post(createMessExpense);

router
  .route("/:mess_expense_Id")
  .get(getMessExpense)
  .patch(updateMessExpense)
  .delete(deleteMessExpense);

module.exports = router;
