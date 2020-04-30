// const electron = require("electron");
const electron = require("electron");
const botlist = require("../../backend/dataControl/botlist");

const { ipcRenderer } = electron;

document.addEventListener("DOMContentLoaded", (event) => {
	if (ipcRenderer.sendSync("run") == "run-bot") {
		ipcRenderer.send("want-bot-name");
		ipcRenderer.on("reply-bot-name", function (e, botName) {
			botlist.RunP2(botName, document);
		});
	}
});
