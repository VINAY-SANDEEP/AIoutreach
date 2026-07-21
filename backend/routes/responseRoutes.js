const express = require("express");
const router = express.Router();

const {
  getResponses,
} = require("../controllers/ResponseController");

router.get("/", getResponses);

module.exports = router;