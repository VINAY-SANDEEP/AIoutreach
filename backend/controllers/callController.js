const Contact = require("../models/Contact");
const { makeCall } = require("../services/twilioService");
const Campaign = require("../models/Campaign");
exports.startCampaign = async (req, res) => {
  let campaign = await Campaign.findOne();

  if (!campaign) {
    campaign = await Campaign.create({
      isRunning: true,
    });
  } else {
    campaign.isRunning = true;
    await campaign.save();
  }

  const contact = await Contact.findOne({ status: "Pending" });

  if (!contact) {
    return res.json({
      success: false,
      message: "No Pending Contacts",
    });
  }

  contact.status = "Calling";
  await contact.save();

  await makeCall(contact.phone);

  res.json({
    success: true,
    message: "Campaign Started",
  });
};
exports.stopCampaign = async (req, res) => {
  let campaign = await Campaign.findOne();

  if (!campaign) {
    campaign = await Campaign.create({
      isRunning: false,
    });
  } else {
    campaign.isRunning = false;
    await campaign.save();
  }
  res.json({
    success: true,
    message: "Campaign Stopped",
  });
};
