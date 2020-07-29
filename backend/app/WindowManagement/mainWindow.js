const isDev = require("electron-is-dev");
const path = require("path");
const { createWindow } = require("./window");

require("dotenv").config();

let mainWindow = createWindow(
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
	false
);

mainWindow.once("ready-to-show", function () {
	mainWindow.maximize();
	mainWindow.show();
});

mainWindow.on("closed", () => (mainWindow = null));

module.exports = { mainWindow };
