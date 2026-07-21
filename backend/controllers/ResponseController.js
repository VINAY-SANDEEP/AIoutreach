const Response = require("../models/Response");

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch responses",
    });
  }
};