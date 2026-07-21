const axios = require("axios");
const fs = require("fs");
const path = require("path");

const { speechToText } = require("../services/sttService");
const Response = require("../models/Response");
const Contact = require("../models/Contact");
const Campaign = require("../models/Campaign");
const { makeCall } = require("../services/twilioService");

exports.saveRecording = async (req, res) => {
  try {
    // Twilio recording URL
    const recordingUrl = req.body.RecordingUrl + ".wav";

    console.log("Recording URL:", recordingUrl);

    // Save recording
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      `${req.body.RecordingSid}.wav`
    );

    const response = await axios({
      method: "GET",
      url: recordingUrl,
      responseType: "stream",
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN,
      },
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on("finish", async () => {
      try {
        console.log("✅ Recording Downloaded");
        console.log(filePath);

        // Speech to Text
        const sttResult = await speechToText(filePath);

        console.log("========== SARVAM RESPONSE ==========");
        console.log(sttResult);

        const transcript =
          sttResult.transcript ||
          sttResult.text ||
          sttResult.output ||
          JSON.stringify(sttResult);

        console.log("Transcript:", transcript);

        // Current contact
const contact = await Contact.findOne({ status: "Calling" });

        if (!contact) {
          console.log("⚠ No contact found with status Calling");
          return;
        }

        // Save response
        const callSid = req.body.CallSid;
const recordingSid = req.body.RecordingSid;
const duration = Number(req.body.RecordingDuration) || 0;

await Response.create({
  contactId: contact._id,
  name: contact.name,
  phone: contact.phone,
  callSid,
  recordingSid,
  transcript,
  duration,
  callStatus: "Completed",
});

        // Mark completed
        contact.status = "Completed";
        await contact.save();

        console.log("✅ Response Saved Successfully");

        // Find next pending contact
        const nextContact = await Contact.findOne({ status: "Pending" });

        if (nextContact) {
          nextContact.status = "Calling";
          await nextContact.save();

          console.log("📞 Calling Next:", nextContact.name);
           const campaign = await Campaign.findOne();

if (!campaign || !campaign.isRunning) {
  console.log("Campaign stopped by admin.");
  return;
}
          await makeCall(nextContact.phone);
        } else {
          console.log("🎉 Campaign Finished");
        }
      } catch (err) {
        console.error("STT Error:", err);
      }
    });

    writer.on("error", (err) => {
      console.error("File Write Error:", err);
    });

    // Respond immediately to Twilio
    res.sendStatus(200);
  } catch (err) {
    console.error("Recording Error:", err);
    res.sendStatus(500);
  }
};