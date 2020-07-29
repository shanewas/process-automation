const {
	app,
	Menu,
	ipcMain,
	dialog,
	Notification,
	BrowserWindow,
} = require("electron");

app
	.on("ready", () => {
		const { mainWindow } = require("./WindowManagement/mainWindow");
		mainWindow.webContents.openDevTools();
	})
	.on("activate", (mainWindow) => {
		//macos
		console.log(mainWindow);
		if (mainWindow === null) {
			require("./WindowManagement/mainWindow").mainWindow();
		}
	});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

//BOT IPC CRUD
require("./Bots/crud");

//Import-Export section
require("./ExternalConnectivity/ImportExport");

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

//importing fancy error module
const { FancyError } = require("../Error/errorHandler");
//error example
console.log(new FancyError("An augmented error"));
// { [Your fancy error: An augmented error] name: 'FancyError' }
