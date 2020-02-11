const csv = require("csv-parser");
const fs = require("fs");

function CSV(path) {
  this.path = path;
  this.value = [];
}
function read_csv() {
  fs.createReadStream(this.path, { bufferSize: 64 * 1024 })
    .pipe(csv())
    .on("data", row => {
      this.value.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}
// function fillUp(data) {
//   console.log(data);
// //   return;
// }
module.exports = { CSV, read_csv };
