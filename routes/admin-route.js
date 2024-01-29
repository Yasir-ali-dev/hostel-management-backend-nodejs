const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/admin-controller");
const authentication = require("../middlewares/authentication");

router.route("/signup").post(signUp);
router.route("/login").post(authentication, login);

module.exports = router;
