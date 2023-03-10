const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controller/userController");

router.post(
  "/",
  check("name", "Please add name").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  userController.registerUser
);

module.exports = router;
