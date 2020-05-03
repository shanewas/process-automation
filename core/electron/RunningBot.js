// const electron = require("electron");
const electron = require("electron");
const botlist = require("../../backend/dataControl/botlist");

const { ipcRenderer, remote } = electron;

document.addEventListener("DOMContentLoaded", (event) => {
	console.log("loaded");
	if (ipcRenderer.sendSync("run") == "run-bot") {
		console.log("run");
		ipcRenderer.send("want-bot-name");
		ipcRenderer.on("reply-bot-name", function (e, botName) {
			global.status.run = false;
			botlist.RunP2(botName, document, remote.getCurrentWindow());
		});
	} else {
		console.log("not run");
		ipcRenderer.send("want-bot-name");
		ipcRenderer.on("reply-bot-name", function (e, botName) {
			botlist.RunP1(botName, remote.getCurrentWindow());
		});
	}
});
