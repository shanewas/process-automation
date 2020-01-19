const electron = require("electron");
const path = require("path");
const url = require("url");

const { BrowserWindow } = electron;
function createWindow(loadurl) {
  //create new window
  window = new BrowserWindow({
    width: 1400,
    height: 1200,
    title: "Aiw Core",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  // window.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "../views/index.html"),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );

  window.loadURL(loadurl);
  return window;
}

module.exports = { createWindow };
