const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

const authController = require("../controller/authController");

router.get("/", authMiddleware, authController.getUser);

router.post(
  "/",
  check("email", "Please include an email").isEmail(),
  check("password", "Password is required").exists(),
  authController.createUser
);

module.exports = router;
