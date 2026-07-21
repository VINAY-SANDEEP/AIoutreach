const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function makeCall(phone) {
  const call = await client.calls.create({
    to: phone,
    from: process.env.TWILIO_PHONE_NUMBER,
    url: `${process.env.BASE_URL}/voice`,
  });

  console.log("📞 Call Started:", call.sid);

  return call;
}

module.exports = {
  makeCall,
};