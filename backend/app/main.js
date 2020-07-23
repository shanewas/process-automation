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

require("./Bots/bots");

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
