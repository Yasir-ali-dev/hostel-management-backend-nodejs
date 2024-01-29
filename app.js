require("dotenv").config();
require("express-async-errors");
const adminRouter = require("./routes/admin-route");
const extraExpensesRouter = require("./routes/extra-expenses");

const express = require("express");
const app = express();
const connectDb = require("./db/connect_db");
const errorHandler = require("./middlewares/error_handler");
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/extra_expenses", extraExpensesRouter);

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
