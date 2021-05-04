const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { ipcMain } = require("electron");

const maxLineLength = 100;
ipcMain.on(
  "csv-get-header",
  async (event, file, readPartOfFileMultiplier = 2) => {
    header = "";
    var readPartOfFile = maxLineLength * readPartOfFileMultiplier;
    var stream = fs.createReadStream(path.resolve(__dirname, file), {
      start: 0,
      end: readPartOfFile,
    });
    var csvStream = csv.parseStream(stream);
    var line = 0;
    csvStream.on("data", function (data) {
      if (line === 0) {
        header = JSON.stringify(data);
        console.log(`ROW=${JSON.stringify(data)}`);
      }
      line++;
    });
    csvStream.on("end", function () {
      console.log("Reading for first line: " + line + " lines.");
      event.returnValue = header;
    });
  }
);
