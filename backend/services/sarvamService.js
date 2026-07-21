require("dotenv").config();

const fs = require("fs");
const { Readable } = require("stream");
const { SarvamAIClient } = require("sarvamai");

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY,
});

async function textToSpeech(text) {
  const response = await client.textToSpeech.convertStream({
    text,
    target_language_code: "en-IN",
    speaker: "shubh",
    model: "bulbul:v3",
    output_audio_codec: "mp3",
    pace: 1,
    speech_sample_rate: 22050,
  });

  const filePath = `./uploads/speech-${Date.now()}.mp3`;

  const nodeStream = Readable.fromWeb(response.stream());
  const writeStream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    nodeStream.pipe(writeStream);
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
  });
}

module.exports = { textToSpeech };