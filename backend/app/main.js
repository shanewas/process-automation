const { app, Menu, ipcMain } = require("electron");
const PIE = require("puppeteer-in-electron");
const PUPPETEER = require("puppeteer-core");

class BOT_PARAMS {
	LINKALREADYOPENED = false;
	BOTALREADYOPENED = false;
	BOTS;
	BOTPROCESS;
	DATA = [];
	ITERATION = 1;
	BOT_VARIABLES = [];
	PROCESSLENGTH = 0;
	PROCESSCOUNTER = 0;
	LOCALDATA;
	IDX;
	ERRSTATUS = [];
	RUNINGSTATUS = false;

	reset_var() {
		this.LINKALREADYOPENED = false;
		this.BOTALREADYOPENED = false;
		this.BOTS = null;
		this.BOTPROCESS = null;
		this.DATA = [];
		this.ITERATION = 1;
		this.BOT_VARIABLES = [];
		this.PROCESSLENGTH = 0;
		this.PROCESSCOUNTER = 0;
		this.LOCALDATA = null;
		this.IDX = 0;
		this.ERRSTATUS = [];
		this.RUNINGSTATUS = false;
	}
}

let PARAMS = new BOT_PARAMS();
let BROWSER;
const main = async () => {
	await PIE.initialize(app);
	BROWSER = await PIE.connect(app, PUPPETEER);
};
main();

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
		require("./Bots/botCreation").bot_create(
			mainWindow,
			PARAMS.LINKALREADYOPENED
		);
		/**
		 * BOT ITEM TYPE TAGGING
		 */
		require("./Bots/typeTag").tagging(mainWindow);

		/**
		 * start bot module
		 */
		const { start_bot } = require("../core/engine");
		ipcMain.on("start-bot", (e, botName) => {
			start_bot(botName, mainWindow, PARAMS);
		});

		/**
		 * bot process module
		 */
		const { run_bot } = require("../core/engine");
		ipcMain.on("need-process", (e) => {
			run_bot(BROWSER, mainWindow, PARAMS);
		});

		/**
		 * Import-Export section
		 */
		require("./ExternalConnectivity/ImportExport").getWindow(mainWindow);

		/**
		 * ocr engine
		 */
		require("./ExternalConnectivity/ocrEngine").ocrEngine(mainWindow);
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

// let myNotification = new Notification("Title", {
// 	body: "Lorem Ipsum Dolor Sit Amet",
// });

// myNotification.onclick = () => {
// 	console.log("Notification clicked");
// };

/**
 * BOT IPC CRUD
 */
require("./Bots/crud");

/**
 * code generation
 */
// require("../../frontend/src/CodeGeneration");

/**
 * notification handling
 */
require("./Notification/notification");

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



/*
Handleing dataset
*/

require("./Dataset/dataset");

/*
end Handleing dataset
*/