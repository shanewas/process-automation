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
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		mainWindow = require("./WindowManagement/windowConfig").mainWindow;
	}
});

const menuConfiguration = require("./ActionBar/config");

menuConfiguration.config();
