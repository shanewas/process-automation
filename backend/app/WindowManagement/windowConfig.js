const isDev = require("electron-is-dev");
const path = require("path");
const window = require("./createWindow");
require("dotenv").config();

let mainWindow = window.createWindow(
	isDev
		? `http://localhost:${process.env.PORT}`
		: `file://${path.join(
				__dirname,
				"..",
				"..",
				"..",
				"frontend",
				"build",
				"index.html"
		  )}`,
	null,
	false,
	true,
	true
);

mainWindow.once("ready-to-show", function () {
	mainWindow.maximize();
	mainWindow.show();
});

mainWindow.on("closed", () => (mainWindow = null));

function createContectWindow() {
	// contectWindow;
}

function createLoadingWindow() {
	// contectWindow;
}

module.exports = { mainWindow, createContectWindow, createLoadingWindow };
