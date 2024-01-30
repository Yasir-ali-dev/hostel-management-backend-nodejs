const { default: mongoose } = require("mongoose");

const hostelPaymentSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: [true, "total is required"],
    min: [0, "total must be greater or equal to 0"],
  },
  paid: {
    type: Number,
    required: [true, "paid amount is required"],
    min: [0, "paid amount must be greater or equal to 0"],
  },
  remaining: {
    type: Number,
    required: [true, "paid amount is required"],
  },
  startdate: {
    type: Date,
    required: [true, "start date is required"],
  },
});

module.exports = mongoose.model("HostelPayment", hostelPaymentSchema);
