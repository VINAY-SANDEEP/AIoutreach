const express = require("express");
const router = express.Router();

const { exportResponses } = require("../controllers/exportController");

router.get("/", exportResponses);

module.exports = router;