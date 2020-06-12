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

const { app, Menu, ipcMain, dialog, Notification } = electron;

let { win, contectWindow, loadingWindow } = require("./electron/windowList");
let window = require("./electron/createWindow");

let browser;
let LINKALREADYOPENED = false;
var BOTS;
var BOTPROCESS;
var DATA = [];
var ITERATION = 1;
var PROCESSLENGTH = 0;
var PROCESSCOUNTER = 0;
var LOCALDATA;
var IDX;
var ERRSTATUS = [];
var RUNINGSTATUS = false;

function reset_var() {
	BOTS = null;
	BOTPROCESS = null;
	DATA = [];
	ITERATION = 1;
	PROCESSLENGTH = 0;
	PROCESSCOUNTER = 0;
	LOCALDATA = null;
	IDX = 0;
	ERRSTATUS = [];
	RUNINGSTATUS = false;
}

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
	loadingWindow = window.createWindow(
		"none",
		win,
		false,
		true,
		true,
		"RunningBot.js"
	);
	loadingWindow.on("close", (e) => {
		e.preventDefault();
		loadingWindow.hide();
		reset_var();
		win.setProgressBar(0.0);
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
	if (!LINKALREADYOPENED) {
		LINKALREADYOPENED = true;
		contectWindow = window.createWindow(procSeq.link, win, false, true, true);
	} else {
		contectWindow.destroy();
		contectWindow = window.createWindow(procSeq.link, win, false, true, true);
	}
	contectWindow.on("close", (e) => {
		LINKALREADYOPENED = false;
		e.preventDefault();
		contectWindow.hide();
		contectWindow.destroy();
	});
	contectWindow.webContents.on("dom-ready", function (e) {
		contectWindow.maximize();
		contectWindow.show();
	});
	win.webContents.send("process-link", procSeq);
});

ipcMain.on("idSeq", function (e, args) {
	if (
		(args.tagName === "INPUT" || args.tagName === "SELECT") &&
		args.type != "submit"
	) {
		args["_type"] = "LoadData";
	} else if (args.tagName === "KeyPress") {
		args["_type"] = "KeyBoard";
	} else if (args.tagName === "ScreenShot") {
		args["_type"] = "ScreenShot";
	} else {
		args["_type"] = "click";
	}
	win.webContents.send("process-link", args);
});

ipcMain.on("start-bot", async function (e, botName) {
	reset_var();
	loadingWindow.loadURL(
		isDev
			? "http://localhost:4000/loading.html"
			: `file://${path.join(__dirname, "../frontend/build/loading.html")}`
	);
	loadingWindow.show();
	await botlist.GetBot(botName).then((docs) => {
		BOTS = docs;
	});
	await botlist.GetProcess(botName).then((docs) => {
		BOTPROCESS = docs;
		PROCESSLENGTH = BOTPROCESS.processSequence.length;
	});
	if (BOTS.filepath) {
		fs.createReadStream(BOTS.filepath, { bufferSize: 64 * 1024 })
			.pipe(csv())
			.on("data", (row) => {
				DATA.push(row);
			})
			.on("end", () => {
				console.log("CSV file successfully processed");
				//inital pop from datacsv to LOCALDATA
				LOCALDATA = DATA.pop();
			});
	}
	let notification = await botlist.setNotification(
		botName,
		"log",
		" has started",
		"null"
	);
	win.webContents.send("notification-single", notification);
	ITERATION = BOTS.botIteration;
	console.log(`Bot is commencing ${ITERATION} iteration`);
	IDX = 0;
	botlist.setLastActiveTime(botName);
	RUNINGSTATUS = true;
});

ipcMain.on("need-process", async function (e) {
	let isLoading = false;
	let autoLoad = false;
	let page = await pie.getPage(browser, loadingWindow, false).catch((err) => {
		isLoading = true;
	});
	let myNotification = new Notification("Title", {
		body: "Lorem Ipsum Dolor Sit Amet",
	});

	myNotification.onclick = () => {
		console.log("Notification clicked");
	};
	if (RUNINGSTATUS && !isLoading) {
		if (Math.floor(ITERATION / 2) === IDX && PROCESSCOUNTER == 0) {
			let notification = await botlist.setNotification(
				BOTS.botName,
				"log",
				" has completed half its task",
				"null"
			);
			win.webContents.send("notification-single", notification);
		}
		if (IDX < ITERATION) {
			console.log(`*** Iteration No. #${IDX} running ***`);
			console.log(`*** Currently on No. #${PROCESSCOUNTER} flowchart item ***`);
			element = BOTPROCESS.processSequence[PROCESSCOUNTER];
			let elements, dat;
			try {
				switch (element._type) {
					case "LoadData":
						if (element.dataHeader) {
							dat = LOCALDATA[element.dataHeader];
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
						loadingWindow.webContents.on("will-navigate", (event, url) => {
							autoLoad = true;
						});
						break;
					case "KeyBoard":
						console.log(`Pressing ${element.value} ...`);
						elements = await page.$x(element.xpath);
						await elements[0].press(`${element.value}`);
						loadingWindow.webContents.on("will-navigate", (event, url) => {
							autoLoad = true;
						});
						break;
					case "ScreenShot":
						console.log(`Taking screenshot ...`);
						console.log(`will saving to ${element.imgpath}`);
						if (!fs.existsSync(element.imgpath)) {
							fs.mkdirSync(element.imgpath);
						}
						let img_filename = `${BOTS.botName}_${IDX}${PROCESSCOUNTER}.jpeg`;
						let pathTo = path.join(element.imgpath, img_filename);
						console.log(pathTo);
						await page.screenshot({
							path: pathTo,
							type: "jpeg",
							fullPage: true,
						});
						loadingWindow.webContents.send("next-process");
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
					DataLength: `#${DATA.length}`,
					CurrentDataRow: `${JSON.stringify(LOCALDATA)}`,
					Iteration: `#${IDX}`,
					ProcCount: `#${PROCESSCOUNTER}`,
					ProcSeq_elem: element,
					Error: error,
				};
				ERRSTATUS.push(errorGen);
				console.log(ERRSTATUS);
				let notification = await botlist.setNotification(
					BOTS.botName,
					"error",
					` is facing an issue with #${PROCESSCOUNTER} process in #${IDX} Iteration`,
					"null"
				);
				win.webContents.send("notification-single", notification);
				// loadingWindow.webContents.send("next-process-state-change");
			}
			if (PROCESSCOUNTER + 1 >= PROCESSLENGTH) {
				PROCESSCOUNTER = 0;
				if (BOTS.filepath) LOCALDATA = DATA.pop();
				IDX++;
			} else {
				PROCESSCOUNTER++;
				if (!autoLoad) {
					loadingWindow.webContents.send("next-process");
				}
			}
		} else {
			let notification = await botlist.setNotification(
				BOTS.botName,
				"log",
				" has completed its task",
				"null"
			);
			win.webContents.send("notification-single", notification);
			win.setProgressBar(0.0);
			loadingWindow.hide();
			reset_var();
		}
		win.setProgressBar(IDX / ITERATION);
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
ipcMain.handle("notification-multi", async (event, notiNumber) => {
	const result = await botlist.getNotification(notiNumber);
	return result;
});
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

ipcMain.on("update-bot-process", async (event, botName, BOTPROCESS) => {
	await botlist.updateBotProcess(botName, BOTPROCESS);
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
	const { size } = fs.statSync(filepath);
	const results = [];
	let analytics = {};
	fs.createReadStream(filepath, { bufferSize: 64 * 1024 })
		.pipe(csv())
		.on("data", (data) => results.push(data))
		.on("end", () => {
			analytics = {
				path: filepath,
				size: size,
				rowNumber: results.length,
				type: "text/csv",
			};
			event.returnValue = analytics;
		});
});

ipcMain.on("code-generation", async (event, file) => {
	let options = {
		title: "Save Generated Python File",
		buttonLabel: "Save Script",
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

ipcMain.on("online-status-changed", (event, status) => {
	console.log(status);
});
