const express = require("express");
const router = express.Router();
const {
  getAllHostelPayments,
  createHostelPayment,
  getHostelPayment,
  updateHostelPayment,
  deleteHostelPayment,
} = require("../controllers/hostel-payment-route");

router.route("/").get(getAllHostelPayments).post(createHostelPayment);

router
  .route("/:hostel_payment_id")
  .get(getHostelPayment)
  .patch(updateHostelPayment)
  .delete(deleteHostelPayment);

module.exports = router;
