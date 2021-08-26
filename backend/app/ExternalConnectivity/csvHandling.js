const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { ipcMain } = require("electron");

const maxLineLength = 100;
ipcMain.on(
  "csv-get-header",
  async (event, file, readPartOfFileMultiplier = 2) => {
    header = [];
    var readPartOfFile = maxLineLength * readPartOfFileMultiplier;
    var stream = fs.createReadStream(path.resolve(__dirname, file), {
      start: 0,
      end: readPartOfFile,
    });
    var csvStream = csv.parseStream(stream);
    var line = 0;
    csvStream.on("data", function (data) {
      if (line === 0) {
        header = data;
      }
      line++;
    });
    csvStream.on("end", function () {
      console.log("Reading for first line: " + line + " lines.");
      event.returnValue = header;
    });
  }
);

ipcMain.on("csv-get-row", async (event, file) => {
  var stream = fs.createReadStream(path.resolve(__dirname, file));
  var csvStream = csv.parseStream(stream);
  var line = 0;
  csvStream.on("data", function (data) {
    line++;
  });
  csvStream.on("end", function () {
    console.log("Reading for first line: " + line + " lines.");
    event.returnValue = line;
  });
});

// const handleLoadCsv = (file) => {
//   Papa.parse(file, {
//     complete: (result) => {
//       const headers = result.data[0];
//       const csvInfo = {
//         name: file.name,
//         path: file.path,
//         rowNumber: result.data.length,
//       };
//       // console.log({ csvInfo });
//       dispatch(
//         loadCsv({
//           headers,
//           csvInfo,
//         })
//       );
//     },
//   });
// };
