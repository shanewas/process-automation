const electron = require("electron");
const csv = require("csv-parser");
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

const { app, Menu, ipcMain, dialog } = electron;

let { win, contectWindow, loadingWindow } = require("./electron/windowList");
let window = require("./electron/createWindow");

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

ipcMain.on("search-link", function (event, args) {
	let procSeq = {
		tagName: `Web Link`,
		type: undefined,
		placeholder: `Link to load "${
			args.includes("https://") || args.includes("http://")
				? args
				: `https://${args}`
		}"`,
		value: undefined,
		link:
			args.includes("https://") || args.includes("http://")
				? args
				: `https://${args}`,
		xpath: undefined,
		ext: {
			label: undefined,
		},
		_type: `link`,
	};
	win.webContents.send("process-link", procSeq);

	contectWindow.loadURL(procSeq.link);
	contectWindow.webContents.on("dom-ready", function (e) {
		contectWindow.maximize();
		contectWindow.show();
	});
	//history
	// console.log(contectWindow.webContents.history);
});

ipcMain.on("idSeq", function (e, args) {
	if (
		(args.tagName === "INPUT" || args.tagName === "SELECT") &&
		args.type != "submit"
	) {
		args["_type"] = "LoadData";
	} else if (args.tagName === "KeyPress") {
		args["_type"] = "KeyBoard";
	} else {
		args["_type"] = "click";
	}
	// console.log(args);
	win.webContents.send("process-link", args);
});

var bots;
var botProcess;
var data = [];
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
		fs.createReadStream(bots.filepath, { bufferSize: 64 * 1024 })
			.pipe(csv())
			.on("data", (row) => {
				data.push(row);
			})
			.on("end", () => {
				console.log("CSV file successfully processed");
			});
		//inital pop from datacsv to localdata
		localData = data.pop();
	}
	iteration = bots.botIteration;
	console.log(iteration);
	idx = 0;
});

ipcMain.on("need-process", async function (e) {
	let page = await pie.getPage(browser, loadingWindow);
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
					if (element.type === "radio" || element.type === "checkbox") {
						if (element.ext.label === dat) {
							elements = await page.$x(element.xpath, {
								visible: true,
							});
							await elements[0].click();
						} else {
							loadingWindow.webContents.send("next-process");
							break;
						}
					} else {
						elements = await page.$x(element.xpath);
						await elements[0].type(dat);
					}
					loadingWindow.webContents.send("next-process");
					break;
				case "click":
					console.log("clicking element ...");
					elements = await page.$x(element.xpath);
					await elements[0].click();
					loadingWindow.webContents.send("next-process-state-change");
					break;
				case "KeyBoard":
					console.log(`Pressing ${element.value} ...`);
					elements = await page.$x(element.xpath);
					await elements[0].press(`${element.value}`);
					loadingWindow.webContents.send("next-process-state-change");
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

ipcMain.handle("bots", async (event) => {
	const result = await botlist.listAllBots();
	return result;
});

ipcMain.handle("bot-name", async (event, botName) => {
	const result = await botlist.fetchBot(botName);
	return result;
});

ipcMain.handle("add-bot", async (event, botName, botType) => {
	const result = await botlist.addBot(botName, botType);
	return result;
});

ipcMain.on("remove-bot", async (event, botName) => {
	await botlist.removeBot(botName);
});

ipcMain.on("update-bot-process", async (event, botName, botProcess) => {
	await botlist.updateBotProcess(botName, botProcess);
});

ipcMain.on("update-bot", async (event, botName, saveBotObj) => {
	await botlist.editBot(
		botName,
		saveBotObj.filepath,
		saveBotObj.headers,
		saveBotObj.status,
		saveBotObj.botIteration
	);
});

ipcMain.handle("get-process", async (event, botName) => {
	const result = await botlist.getProcessSequence(botName);
	return result;
});

ipcMain.on("file-analytics", async (event, filepath) => {
	const {size} = fs.statSync(filepath);
	const results = [];
	let analytics={}
	fs.createReadStream(filepath,{ bufferSize: 64 * 1024 })
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		 analytics={
			"path":filepath,
			"size":size,
			"rowNumber":results.length,
			"type":"text/csv"
		}
	event.returnValue= analytics
	});
	


});

ipcMain.on("code-generation", async (event, file) => {
	let options = {
		title: "Save Generated Python File",
		buttonLabel: "💾 Save Script",
		filters: [
			{ name: "Python", extensions: ["py"] },
			{ name: "All Files", extensions: ["*"] },
		],
	};
	const save = dialog.showSaveDialog(win, options);
	fs.writeFile((await save).filePath, file, function (err) {
		if (err) console.log("Canceled!");
		else console.log("Saved!");
	});
});

// Internet Status

ipcMain.on('online-status-changed', (event, status) => {
	console.log(status)
  })