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
	win = window.createWindow(
		isDev
			? "http://localhost:4000"
			: `file://${path.join(__dirname, "../frontend/build/index.html")}`,
		false
	);
	contectWindow = window.createWindow("none", win, false, true, true);
	contectWindow.on("close", (e) => {
		e.preventDefault();
		contectWindow.hide();
	});
	loadingWindow = window.createWindow(
		"none",
		win,
		true,
		true,
		true,
		"RunningBot.js"
	);
	loadingWindow.on("close", (e) => {
		e.preventDefault();
		loadingWindow.hide();
	});
	win.once("ready-to-show", function () {
		win.maximize();
		win.show();
	});
	// Build menu
	const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
	// Inset menu
	Menu.setApplicationMenu(mainMenu);

	win.on(
		"closed",
		() => ((window = null), (loadingWindow = null), (contectWindow = null))
	);
	// contectWindow.on("closed", () => (contectWindow = null));
	// loadingWindow.on("closed", () => (loadingWindow = null));
}

ipcMain.on("search-link", function (event, object) {
	procSeq["_type"] = "link";
	if (object.includes("http://" || object.includes("https://"))) {
		procSeq["link"] = object;
	} else {
		procSeq["link"] = `https://${object}`;
	}
	console.log(procSeq);
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

var bots;
var botProcess;
var data;

ipcMain.on("start-bot", async function (e, botName) {
	botlist.RunP1(botName, loadingWindow);

	await botlist.GetBot(botName).then((docs) => {
		bots = docs;
	});
	await botlist.GetProcess(botName).then((docs) => {
		botProcess = docs;
	});

	for (let index = 1; index < botProcess.processSequence.length; index++) {
		let xpath = botProcess.processSequence[index].xpath;
		let loadData = "sopme data";
		let package = { xpath, loadData };
		console.log(botProcess.processSequence[index]);
		switch (botProcess.processSequence[index]._type) {
			case "LoadData":
				ipcMain.on("need-form", function () {
					loadingWindow.webContents.send("form-fill-up", package);
				});
				console.log(`LoadData : ${xpath}`);
				break;
			case "click":
				ipcMain.on("need-click", function () {
					loadingWindow.webContents.send("click-it", package);
				});
				console.log(`Click : ${xpath}`);
			default:
				console.log("_type doesnt match");
		}
	}
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
