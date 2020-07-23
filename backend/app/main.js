const {
  app,
  Menu,
  ipcMain,
  dialog,
  Notification,
  BrowserWindow,
} = require("electron");

let mainWindow = null;

app.on("ready", () => {
  mainWindow = require("./WindowManagement/windowConfig").mainWindow;
  mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  //macos
  if (mainWindow === null) {
    mainWindow = require("./WindowManagement/windowConfig").mainWindow;
  }
});

//** Menu building section START */
//require Templete
const { mainMenuTempate } = require("./ActionBar/menu");
// Build menu
const mainMenu = Menu.buildFromTemplate(mainMenuTempate);
// Inset menu
Menu.setApplicationMenu(mainMenu);
//menu dev/prod configuration
require("./ActionBar/config");
//** Menu building section END */

// Import Here
const menuConfiguration = require("./ActionBar/config");
const bots = require("./Bots/bots");
const importExport = require("./ExternalConnectivity/ImportExport");

// Connect Here
menuConfiguration.config();
bots.botHandler();
importExport.importExportHandler();
