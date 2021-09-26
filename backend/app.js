const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet("data");

const port = 9999;

app.post("/data", async (req, res) => {
  const data = await req.body;
  console.log(data)
  const headingColumnNames = ["uid", "api", "time", "station"];
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(Object.keys(heading));
  });

  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  });
  wb.write('TeacherData.xlsx');

  console.log(data);
});

app.listen(port, () => {
  console.log("Port is running");
});
