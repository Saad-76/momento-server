const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();
router.post("/newUser", userController.registerUser);
router.post("/signIn", userController.signIn);
router.post("/forget", userController.forgetPassword);

module.exports = router;
