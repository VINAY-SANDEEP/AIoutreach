const Response = require("../models/Response");

exports.getAnalytics = async (req, res) => {
  try {
    const responses = await Response.find();

    const issues = {
      Roads: 0,
      Water: 0,
      Drainage: 0,
      Electricity: 0,
      Other: 0,
    };

    responses.forEach((item) => {
      const text = (item.transcript || "").toLowerCase();

      if (text.includes("road")) {
        issues.Roads++;
      } else if (text.includes("water")) {
        issues.Water++;
      } else if (
        text.includes("drainage") ||
        text.includes("drain")
      ) {
        issues.Drainage++;
      } else if (
        text.includes("electricity") ||
        text.includes("power") ||
        text.includes("current")
      ) {
        issues.Electricity++;
      } else {
        issues.Other++;
      }
    });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Analytics Error",
    });
  }
};