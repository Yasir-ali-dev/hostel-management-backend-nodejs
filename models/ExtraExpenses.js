const mongoose = require("mongoose");

const ExtraExpenses = mongoose.Schema({
  description: {
    type: String,
    required: [true, "description is required"],
  },
  amount: {
    type: Number,
    required: [true, "description is required"],
    min: [0, "amount should be positive"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
  totalExpenses: {
    type: Number,
  },
});

module.exports = new mongoose.model("ExtraExpenses", ExtraExpenses);
