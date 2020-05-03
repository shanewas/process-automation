// const electron = require("electron");
const electron = require("electron");
const botlist = require("../../backend/dataControl/botlist");

const { ipcRenderer, remote } = electron;
document.addEventListener("DOMContentLoaded", (event) => {
	console.log("loaded");
	if (ipcRenderer.sendSync("run")) {
		console.log("run");
		ipcRenderer.send("want-bot-name");
		ipcRenderer.on("reply-bot-name", function (e, botName) {
			botlist.RunP2(botName, document, remote.getCurrentWindow());
		});
	}
});
