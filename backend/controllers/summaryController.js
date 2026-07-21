const Response = require("../models/Response");

exports.getSummary = async (req, res) => {
  try {
    const responses = await Response.find();

    let roads = 0;
    let water = 0;
    let drainage = 0;
    let electricity = 0;
    let other = 0;

    responses.forEach((item) => {
      const text = (item.transcript || "").toLowerCase();

      if (text.includes("road")) roads++;
      else if (text.includes("water")) water++;
      else if (text.includes("drain")) drainage++;
      else if (
        text.includes("electricity") ||
        text.includes("power") ||
        text.includes("current")
      ) electricity++;
      else other++;
    });

    const total = responses.length;

    let majorIssue = "Other";
    let max = other;

    if (roads > max) {
      max = roads;
      majorIssue = "Roads";
    }

    if (water > max) {
      max = water;
      majorIssue = "Water";
    }

    if (drainage > max) {
      max = drainage;
      majorIssue = "Drainage";
    }

    if (electricity > max) {
      max = electricity;
      majorIssue = "Electricity";
    }

    res.json({
      success: true,
      summary: {
        totalResponses: total,
        majorIssue,
        roads,
        water,
        drainage,
        electricity,
        other,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Summary Error",
    });
  }
};