require("dotenv").config();

const fs = require("fs");
const { SarvamAIClient } = require("sarvamai");

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY,
});

async function speechToText(filePath) {
  try {
    const response = await client.speechToText.transcribe({
      file: fs.createReadStream(filePath),
      model: "saaras:v3",
      language_code: "en-IN",
      mode: "transcribe",
    });

    console.log("========== SARVAM RESPONSE ==========");
    console.log(response);

    return response;
  } catch (err) {
    console.error("========== SARVAM ERROR ==========");
    console.error(err);
    throw err;
  }
}

module.exports = {
  speechToText,
};