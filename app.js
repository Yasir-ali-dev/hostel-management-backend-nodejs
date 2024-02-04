require("dotenv").config();
require("express-async-errors");
const adminRouter = require("./routes/admin-route");
const extraExpensesRouter = require("./routes/extra-expenses");
const messExpensesRouter = require("./routes/mess-expenses-route");
const express = require("express");
const app = express();
const connectDb = require("./db/connect_db");
const errorHandler = require("./middlewares/error_handler");
const messPaymentRouter = require("./routes/mess-payment-route");
const hostelPaymentRouter = require("./routes/hostel-payment-route");
const studentRouter = require("./routes/student-route");

// middlewares
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ title: "Hostel Management" });
});
app.use("/auth", adminRouter);
app.use("/extra_expenses", extraExpensesRouter);
app.use("/mess_expenses", messExpensesRouter);
app.use("/mess_payment", messPaymentRouter);
app.use("/hostel_payment", hostelPaymentRouter);
app.use("/students", studentRouter);

// error-handler middleware
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("app is listening to the port", port);
  } catch (error) {
    console.log(error);
  }
});
