require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();
const connectDb = require("./db/connect_db");

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("app is listening to the port", port);
  } catch (error) {
    console.log(error);
  }
});
