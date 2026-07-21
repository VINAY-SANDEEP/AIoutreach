const ExcelJS = require("exceljs");
const Response = require("../models/Response");

exports.exportResponses = async (req, res) => {
  try {
    const responses = await Response.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Survey Responses");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Transcript", key: "transcript", width: 80 },
      { header: "Date", key: "createdAt", width: 25 },
    ];

    responses.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        phone: item.phone,
        transcript: item.transcript,
        createdAt: item.createdAt,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SurveyResponses.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Export Failed");
  }
};