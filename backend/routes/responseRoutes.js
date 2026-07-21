const express = require("express");
const router = express.Router();

const {
  getResponses,
} = require("../controllers/responseController");

router.get("/", getResponses);

module.exports = router;