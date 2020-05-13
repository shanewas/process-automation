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
		null,
		false,
		true,
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
	if (object.includes("http://") || object.includes("https://")) {
		procSeq["link"] = object;
	} else {
		procSeq["link"] = `https://${object}`;
	}
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

var GLOBALPROCESINIT;
var GLOBALPROCESLENGTH;

var LOCALPROCEESSINIT = 0;
var LOCALPROCEESSLENGTH = 0;

var ITTERATIONSET = [10, 10];

var itteration = 10;
var iteration = 1;
var processlength;
var processCounter = 0;
var localData;
var idx;
ipcMain.on("start-bot", async function (e, botName) {
		loadingWindow.loadURL(isDev
		? "http://localhost:4000/loading.html"
		: `file://${path.join(__dirname, "../frontend/build/loading.html")}`,);
	loadingWindow.show();
	await botlist.GetBot(botName).then((docs) => {
		bots = docs;
	});
	await botlist.GetProcess(botName).then((docs) => {
		botProcess = docs;
		processlength = botProcess.processSequence.length;
	});
	if (bots.filepath) {
		await botlist.GetCsv(bots.filepath).then((docs) => {
			data = docs;
		});
		//inital pop from datacsv to localdata
		localData = data.pop();
	}
	iteration = bots.botIteration;
	idx = 0;
});

ipcMain.on("need-process", function (e) {
	if (idx < iteration) {
		console.log("*********Bot Process Number*********** " + idx);
		element = botProcess.processSequence[processCounter];
		let path;
		switch (element._type) {
			case "LoadData":
				let dat;
				if (element.dataHeader) {
					dat = localData[element.dataHeader];
				} else {
					dat = element.MenualData;
				}
				path = element.xpath;
				let package = { path, dat };
				console.log(`sending data to load ...`);
				loadingWindow.webContents.send("form-fill-up", package);
				break;
			case "click":
				path = element.xpath;
				console.log("clicking form element ...");
				loadingWindow.webContents.send("click-it", path);
				break;
			case "link":
				console.log("loading url ...");
				loadingWindow.loadURL(element.link);
				break;
			default:
				console.log("_type doesnt match");
		}
		if (processCounter + 1 >= processlength) {
			processCounter = 0;
			if (bots.filepath) localData = data.pop();
			idx++;
		} else {
			processCounter++;
		}
	} else {
		loadingWindow.hide();
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
