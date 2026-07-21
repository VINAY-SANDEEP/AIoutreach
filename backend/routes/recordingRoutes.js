const express = require("express");
const router = express.Router();

const { saveRecording } = require("../controllers/recordingController");

router.post("/", saveRecording);

module.exports = router;