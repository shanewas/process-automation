const { ipcMain, dialog } = require("electron");
const fs = require("fs");

function code_generation(mainWindow) {
  ipcMain.on("code-generation", async (event, file) => {
    let options = {
      title: "Save Generated Python File",
      buttonLabel: "Save Script",
      filters: [
        { name: "Python", extensions: ["py"] },
        { name: "All Files", extensions: ["*"] },
      ],
    };
    const save = dialog.showSaveDialog(mainWindow, options);
    fs.writeFile((await save).filePath, file, function (err) {
      if (err) console.log("Canceled!");
      else console.log("Saved!");
    });
  });
}

module.exports = { code_generation };
