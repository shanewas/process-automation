const electron = require("electron");
const isDev = require("electron-is-dev");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const botlist = require("../backend/dataControl/botlist");
const conf = require("./electron/config");
const menu = require("./electron/menu");

require("electron-reload")(__dirname, {
	electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

const { app, Menu, ipcMain } = electron;

let { win, contectWindow, loadingWindow } = require("./electron/windowList");
let window = require("./electron/createWindow");

let procSeq = {};
let browser;

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
		(args.tagName === "INPUT" || args.tagName === "SELECT") &&
		args.type != "submit"
	) {
		args["_type"] = "LoadData";
	} else {
		args["_type"] = "click";
	}
	// console.log(args);
	win.webContents.send("process-link", args);
});

var bots;
var botProcess;
var data;
var iteration = 1;
var processlength;
var processCounter = 0;
var localData;
var idx;
var ERRSTATUS = [];

ipcMain.on("start-bot", async function (e, botName) {
	loadingWindow.loadURL(
		isDev
			? "http://localhost:4000/loading.html"
			: `file://${path.join(__dirname, "../frontend/build/loading.html")}`
	);
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

ipcMain.on("need-process", async function (e) {
	const page = await pie.getPage(browser, loadingWindow);
	if (idx < iteration) {
		console.log("*********Bot Process Number*********** " + idx);
		element = botProcess.processSequence[processCounter];
		let elements, dat;
		try {
			switch (element._type) {
				case "LoadData":
					if (element.dataHeader) {
						dat = localData[element.dataHeader];
					} else {
						dat = element.MenualData;
					}
					console.log(`sending data to load ...`);
					if (element.type === "radio") {
						if (element.ext.label === dat) {
							elements = await page.$x(element.xpath, {
								visible: true,
							});
							await elements[0].click();
						} else {
							loadingWindow.webContents.send("form-fill-up");
							break;
						}
					} else {
						elements = await page.$x(element.xpath);
						await elements[0].type(dat);
					}
					loadingWindow.webContents.send("form-fill-up");
					break;
				case "click":
					console.log("clicking form element ...");
					elements = await page.$x(element.xpath);
					await elements[0].click();
					loadingWindow.webContents.send("click-it");
					break;
				case "link":
					console.log("loading url ... " + page.url());
					await page.goto(element.link);
					break;
				default:
					console.log("_type doesnt match");
			}
		} catch (error) {
			var errorGen = {
				datatime: new Date(),
				type: element._type,
				DataLength: `#${data.length}`,
				CurrentDataRow: `${JSON.stringify(localData)}`,
				Iteration: `#${idx}`,
				ProcCount: `#${processCounter}`,
				ProcSeq_elem: element,
				Error: error,
			};
			await page.reload();
			ERRSTATUS.push(errorGen);
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
function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
const main = async () => {
	await pie.initialize(app);
	browser = await pie.connect(app, puppeteer);
};
main();
app.on("ready", () => {
	generateMainWindow();
});

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

//data COM
//ipcRenderer.invoke("bots", botName).then((result) => {})

ipcMain.on("bots", async (event) => {
	const result = await botlist.listAllBots();
	if (retsult) return result;
	else console.log("No bot Found");
});

//ipcRenderer.invoke("bot-name", botName).then((result) => {})

ipcMain.on("bot-name", async (event, botName) => {
	const result = await botlist.fetchBot(botName);
	if (retsult) return result;
	else console.log("No bot Found");
});

//ipcRenderer.invoke("add-bot", botName, botType).then((result) => {})

ipcMain.on("add-bot", async (event, botName, botType) => {
	const result = await botlist.addBot(botName, botType);
	return result;
});

//ipcRenderer.invoke("remove-bot", botName).then((result) => {})

ipcMain.on("remove-bot", async (event, botName) => {
	const result = await botlist.removeBot(botName);
	return result;
});

//ipcRenderer.invoke("udpate-bot", botName, botFilePath, botStatus, botIteration).then((result) => {})

ipcMain.on(
	"update-bot",
	async (event, botName, botFilePath, botStatus, botIteration) => {
		const result = await botlist.editBot(
			botName,
			botFilePath,
			botStatus,
			botIteration
		);
		return result;
	}
);

//ipcRenderer.invoke("update-bot-process", botName, botProcess).then((result) => {})

ipcMain.on("update-bot-process", async (event, botName, botProcess) => {
	const result = await botlist.editBotProcess(botName, botProcess);
	return result;
});

//ipcRenderer.invoke("get-process", param).then((result) => {})

ipcMain.on("get-process", async (event, botName) => {
	const result = await botlist.getProcessSequence(botName);
	return result;
});
