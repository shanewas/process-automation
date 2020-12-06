const { ipcMain } = require("electron");
const { createWindow } = require("../WindowManagement/window");

let contectWindow = null;

function bot_create(mainWindow, LINKALREADYOPENED) {
  ipcMain.on("search-link", function (event, args) {
    let procSeq = {
      ocr: false,
      label: "",
      link: "",
      variableField: "",
      saveToVariable: "",
      variableUsed: "",
      entryType: "manual",
      dataEntry: "",
      type: "",
      value: "",
      xpath: "",
      tagName: `Web Link`,
      placeholder: `Link to load "${
        args.includes("https://") || args.includes("http://")
          ? args
          : `https://${args}`
      }"`,
      link:
        args.includes("https://") || args.includes("http://")
          ? args
          : `https://${args}`,
      // TODO: REMOVE THIS
      ext: {
        label: undefined,
      },
      _type: `link`,
    };
    if (!LINKALREADYOPENED) {
      LINKALREADYOPENED = true;
      contectWindow = createWindow(procSeq.link, mainWindow, false, true, true);
    } else {
      contectWindow.destroy();
      contectWindow = createWindow(procSeq.link, mainWindow, false, true, true);
    }
    contectWindow.setResizable(false);
    contectWindow.openDevTools();
    contectWindow.on("close", (e) => {
      LINKALREADYOPENED = false;
      e.preventDefault();
      contectWindow.hide();
      contectWindow.destroy();
    });
    contectWindow.webContents.on("dom-ready", function (e) {
      contectWindow.maximize();
      contectWindow.show();
    });
    mainWindow.webContents.send("process-link", procSeq);
  });
}
module.exports = { bot_create };
