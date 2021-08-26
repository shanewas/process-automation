const { ipcMain, dialog } = require("electron");

ipcMain.on("get-synchronous-upload-folder-path", async (event) => {
  var path = await dialog.showOpenDialog({
    properties: ["openFile"],
  });
  event.returnValue = path.filePaths[0];
});

ipcMain.on("get-synchronous-download-folder-path", async (event) => {
  var path = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  event.returnValue = path.filePaths[0];
});