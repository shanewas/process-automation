const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow = require("./createWindow");
const menu = require("./menu");
const conf = require("./config");

const { app, Menu } = electron;

let win;

function generateMainWindow() {
  win = mainWindow.createWindow(
    isDev
      ? "https://google.com"//"http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
    true
  );

  win.once("ready-to-show", function() {
    win.show();
  });
  //Build menu
  const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
  //Inset menu
  Menu.setApplicationMenu(mainMenu);

  win.on("closed", () => (mainWindow = null));
}

app.on("ready", generateMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    generateMainWindow();
  }
});

conf.config();
