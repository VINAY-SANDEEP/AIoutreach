require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const recordingRoutes = require("./routes/recordingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const callRoutes = require("./routes/callRoutes");
const responseRoutes = require("./routes/responseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const exportRoutes = require("./routes/exportRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const historyRoutes = require("./routes/historyRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.json());

// Serve generated audio files
app.use("/audio", express.static("public/audio"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Election Survey Backend Running 🚀",
  });
});
// API Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/call", callRoutes);
app.use("/recording", recordingRoutes);
// Twilio Voice Webhook
app.use("/api/export", exportRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/summary", summaryRoutes);
app.post("/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Play AI greeting
  twiml.play(`${process.env.BASE_URL}/audio/speech.mp3`);

  // Pause for 1 second
  twiml.pause({ length: 1 });

  // Ask the survey question and record the answer
  twiml.record({
    maxLength: 15,
    playBeep: true,
    transcribe: false,
    recordingStatusCallback: `${process.env.BASE_URL}/recording`,
    recordingStatusCallbackMethod: "POST",
  });

  twiml.say("Thank you for participating. Goodbye.");

  res.type("text/xml");
  res.send(twiml.toString());
});
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});