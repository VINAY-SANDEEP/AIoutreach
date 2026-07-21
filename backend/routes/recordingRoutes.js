const express = require("express");
const router = express.Router();

const { saveRecording } = require("../controllers/RecordingController");

router.post("/", saveRecording);

module.exports = router;