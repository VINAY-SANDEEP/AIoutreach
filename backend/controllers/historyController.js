const Response = require("../models/Response");

exports.getHistory = async (req, res) => {
  try {
    const history = await Response.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "History Error",
    });
  }
};