require("dotenv").config();
require("express-async-errors");
const adminRouter = require("./routes/admin-route");
const extraExpensesRouter = require("./routes/extra-expenses");
const messExpensesRouter = require("./routes/mess-expenses-route");
const express = require("express");
const app = express();
const connectDb = require("./db/connect_db");
const errorHandler = require("./middlewares/error_handler");
const { default: mongoose } = require("mongoose");

// middlewares
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/extra_expenses", extraExpensesRouter);
app.use("/mess_expenses", messExpensesRouter);

// error-handler middleware
app.use(errorHandler);

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});
const User = mongoose.model("User", UserSchema);
const profileSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
});

const Profile = mongoose.model("Profile", profileSchema);
const createUser = async () => {
  const user = User({
    username: "john",
    email: "john@example.com",
  });
  const profile = Profile({
    fullName: "John Doe",
    age: 25,
  });
  user.profile = profile;
  const newUser = Promise.all([user.save(), profile.save()])
    .then(() => {
      return User.findOne({ username: "john" }).populate("profile").exec();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(newUser);
};

createUser();

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("app is listening to the port", port);
  } catch (error) {
    console.log(error);
  }
});
