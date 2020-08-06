const { app, Menu } = require("electron");

app
	.on("ready", () => {
		/**
		 * splash screen
		 */
		const { splashWindow } = require("./WindowManagement/splashScreen");
		splashWindow.show();
		/**
		 * main window import
		 * destrying splash on main window load
		 */
		const { mainWindow, splash } = require("./WindowManagement/mainWindow");
		splash(splashWindow);
		/**
		 * BOT CREATING MODULE
		 */
		require("./Bots/botCreation").bot_create(mainWindow);
		/**
		 * BOT ITEM TYPE TAGGING
		 */
		require("./Bots/typeTag").tagging(mainWindow);
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

/**
 * BOT IPC CRUD
 */
require("./Bots/crud");

/**
 * Import-Export section
 */
require("./ExternalConnectivity/ImportExport");

/**
 * Menu building section START
 * Required Templete
 * MENU DEV/PRODUCTION CONFIG
 * Build menu
 * Inset menu
 */
const { mainMenuTempate } = require("./ActionBar/menu");
const mainMenu = Menu.buildFromTemplate(mainMenuTempate);
Menu.setApplicationMenu(mainMenu);
/** Menu building section END */

/**
 * importing fancy error module
 */
// const { FancyError } = require("../Error/errorHandler");
//error example
// console.log(new FancyError("An augmented error"));
// { [Your fancy error: An augmented error] name: 'FancyError' }
