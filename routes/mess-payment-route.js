const express = require("express");
const router = express.Router();
const {
  getAllMessPayments,
  getMessPayment,
  updateMessPayment,
  createMessPayment,
  deleteMessPayment,
} = require("../controllers/mess-payment-controller");

router.route("/").get(getAllMessPayments).post(createMessPayment);
router
  .route("/:mess_payment_id")
  .get(getMessPayment)
  .patch(updateMessPayment)
  .delete(deleteMessPayment);

module.exports = router;
