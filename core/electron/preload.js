const xpath = require("../modules/xpath");
const { ipcRenderer } = require("electron");
const { win, contectWindow } = require("./windowList");

window.onload = function () {
	const body = document.querySelector("body");
	body.addEventListener("click", (e) => {
		if (e.shiftKey) {
			e.preventDefault();
			console.log(xpath.getXPath(e));
			const xp = xpath.getXPath(e);
			ipcRenderer.send("xpath", xp);
		}
	});
};
