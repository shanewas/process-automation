const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let window = require("./electron/createWindow");
const menu = require("./electron/menu");
const conf = require("./electron/config");
let { win, contectWindow, loadingWindow } = require("./electron/windowList");
const botlist = require("../backend/dataControl/botlist");

const { app, Menu, ipcMain } = electron;

require("electron-reload")(__dirname, {
	electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

let procSeq = {};

function generateMainWindow() {
	// let isDev = false;
	win = window.createWindow(
		isDev
			? "http://localhost:4000"
			: `file://${path.join(__dirname, "../frontend/build/index.html")}`,
		false
	);
	contectWindow = window.createWindow("none", true);
	contectWindow.on("close", (e) => {
		e.preventDefault();
		contectWindow.hide();
	});
	loadingWindow = window.createWindow("none", true, "RunningBot.js");
	loadingWindow.on("close", (e) => {
		e.preventDefault();
		loadingWindow.hide();
	});
	win.once("ready-to-show", function () {
		win.show();
	});
	// Build menu
	const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
	// Inset menu
	Menu.setApplicationMenu(mainMenu);

	win.on("closed", () => (window = null));
	contectWindow.on("closed", () => (contectWindow = null));
	loadingWindow.on("closed", () => (loadingWindow = null));
}

ipcMain.on("search-link", function (event, object) {
	procSeq["_type"] = "link";
	if (object.includes("http://" || object.includes("https://"))) {
		procSeq["link"] = object;
	} else {
		procSeq["link"] = `https://${object}`;
	}
	console.log(procSeq);
	/** uncomment to enable link in process flowchart */
	win.webContents.send("process-link", procSeq);

	contectWindow.loadURL(procSeq["link"]);
	contectWindow.show();
});

ipcMain.on("idSeq", function (e, args) {
	if (
		(args.tagName == "INPUT" || args.tagName == "SELECT") &&
		args.type != "submit"
	) {
		args["_type"] = "LoadData";
	} else {
		args["_type"] = "click";
	}
	console.log(args);
	win.webContents.send("process-link", args);
});

ipcMain.on("Save-Bot", function (e, bot) {
	if (!botlist.fetchBot(bot.botName)) {
		botlist.addBot(bot.botName, "automation");
	}
	botlist.editBotProcess(bot.botName, bot.process);
	botlist.editBot(bot.botName, bot.filepath, bot.headers, bot.status);
});

ipcMain.on("start-bot", function (e, botName) {
	console.log("asdasd");
	let process = {
		process: [
			{ _type: "link", link: "https://facebook.com" },
			{
				placeholder: null,
				tagName: "INPUT",
				type: "email",
				value: "",
				xpath: '//*[@id="email"]',
				_type: "LoadData",
				dataHeader: "first_name",
				dataHeaderindex: 0,
			},
			{
				placeholder: null,
				tagName: "INPUT",
				type: "password",
				value: "",
				xpath: '//*[@id="pass"]',
				_type: "LoadData",
				dataHeader: "last_name",
				dataHeaderindex: 1,
			},
			{
				placeholder: null,
				tagName: "INPUT",
				type: "radio",
				value: "1",
				xpath: '//*[@id="u_0_9"]',
				_type: "click",
			},
		],
	};
	loadingWindow.loadURL(process.process[0].link);
	loadingWindow.show();
	// loadingWindow.webContents.send("run-bot-trigger", "works");
	// e.sender.send("run-bot-trigger", "async pong");
	// ipcMain.on("open-window", function (e, link) {});
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
