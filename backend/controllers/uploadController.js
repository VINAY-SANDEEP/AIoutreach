const XLSX = require("xlsx");
const Contact = require("../models/Contact");
const fs = require("fs");

exports.uploadExcel = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an Excel file."
      });
    }

    console.log("Uploaded File:", req.file);

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
     console.log(data);
    let count = 0;

    for (const row of data) {
      if (!row.Name || !row.Phone) continue;

      await Contact.updateOne(
        { phone: String(row.Phone) },
        {
          name: row.Name,
          phone: String(row.Phone)
        },
        { upsert: true }
      );

      count++;
    }

    // Delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: "Excel uploaded successfully!",
      totalContacts: count
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};