const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  contactId: mongoose.Schema.Types.ObjectId,

  name: String,

  phone: String,

  callSid: String,

  recordingSid: String,

  transcript: String,

  callStatus: {
    type: String,
    default: "Completed",
  },

  duration: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Response", responseSchema);