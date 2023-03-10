const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");
const contactController = require("../controller/contactController");

//get all user contact
router.get("/", authMiddleware, contactController.getUserContacts);

//add new contact
router.post(
  "/",
  authMiddleware,
  check("name", "Name is required").not().isEmpty(),
  contactController.postNewConatct
);

//update a contact

router.put("/:id", authMiddleware, contactController.putUpdateConatct);

//delete a contact

router.delete("/:id", authMiddleware, contactController.deleteContact);

module.exports = router;
