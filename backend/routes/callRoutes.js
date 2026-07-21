const express = require("express");
const router = express.Router();
const {
  startCampaign,
  stopCampaign,
} = require("../controllers/callController");

router.post("/start", startCampaign);

router.post("/stop", stopCampaign);
module.exports = router;