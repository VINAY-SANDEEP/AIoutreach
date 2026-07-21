require("dotenv").config();

const { textToSpeech } = require("./services/sarvamService");

async function test() {
  try {
    const file = await textToSpeech("Hello. Welcome to VoicePoll AI.");
    console.log(file);
  } catch (err) {
    console.error(err);
  }
}

test();