const mongoose = require("mongoose");
const connectDb = (URI) => {
  mongoose
    .connect(URI)
    .then()
    .catch((err) => console.log(err));
};

module.exports = connectDb;
