const express = require("express");
const contentController = require("../controller/contentController");

const router = express.Router();

router.get("/posts", contentController.getAllPosts);

module.exports = router;
