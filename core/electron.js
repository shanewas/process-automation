const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let window = require("./electron/createWindow");
const menu = require("./electron/menu");
const conf = require("./electron/config");
let { win, contectWindow } = require("./electron/windowList");

const { app, Menu, ipcMain } = electron;

require("electron-reload")(__dirname, {
	electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

function generateMainWindow() {
	// let isDev = false;
	win = window.createWindow(
		isDev
			? "http://localhost:4000"
			: `file://${path.join(__dirname,"../frontend/build/index.html")}`,
		false
	);
	contectWindow = window.createWindow("none", true);
	contectWindow.on("close", (e) => {
		e.preventDefault();
		contectWindow.hide();
	});
	win.once("ready-to-show", function () {
		win.show();
	});
	// Build menu
	const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
	// Inset menu
	Menu.setApplicationMenu(mainMenu);

	win.on("closed", () => (window = null));
}

ipcMain.on("search-link", function (event, object) {
	if (object.includes("http://" || object.includes("https://"))) {
		contectWindow.loadURL(object);
	} else {
		contectWindow.loadURL(`https://${object}`);
	}
	contectWindow.show();
});

ipcMain.on("xpath", function (e, args) {
	console.log(args);
	win.webContents.send("search-link", args);
});

app.on("ready", generateMainWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (window === null) {
		generateMainWindow();
	}
});

conf.config();
