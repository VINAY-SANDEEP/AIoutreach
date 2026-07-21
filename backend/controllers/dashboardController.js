const Contact = require("../models/Contact");
const Response = require("../models/Response");

exports.getDashboard = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();

    const completedCalls = await Contact.countDocuments({
      status: "Completed",
    });

    const pendingCalls = await Contact.countDocuments({
      status: "Pending",
    });

    const callingNow = await Contact.countDocuments({
      status: "Calling",
    });

    const totalResponses = await Response.countDocuments();

    res.json({
      totalContacts,
      completedCalls,
      pendingCalls,
      callingNow,
      totalResponses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Dashboard Error",
    });
  }
};