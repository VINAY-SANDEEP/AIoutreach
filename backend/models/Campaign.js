const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  isRunning: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);