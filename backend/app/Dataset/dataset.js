const fs = require("fs");
const { ipcMain } = require("electron");
const csv = require("csv-parser");

ipcMain.on("get-dataset", async (event, filepath) => {
  if (fs.existsSync(filepath)) {
    const { size } = fs.statSync(filepath);
    const results = [];
    let analytics = {};
    fs.createReadStream(filepath, { bufferSize: 64 * 1024 })
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        analytics = {
          exists: true,
          path: filepath,
          size: size,
          rowNumber: results.length,
          type: "text/csv",
        };
        event.reply("dataset-result", analytics);
      });
  } else {
    analytics = {
      exists: false,
    };
    event.reply("dataset-result", analytics);
  }
});
