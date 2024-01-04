const express = require("express");
const {
  loginController,
  registrationController,
} = require("../controllers/userController");

const router = express.Router();

//POST || Login
router.post("/login", loginController);

//POST || Registration
router.post("/registration", registrationController);

module.exports = router;
