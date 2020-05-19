const electron = require("electron");

const { ipcRenderer } = electron;
function processRunner(event) {
	ipcRenderer.send("need-process");
}
ipcRenderer.on("form-fill-up", function (e) {
	processRunner(e);
});
ipcRenderer.on("click-it", function (e) {
	if (document.readyState !== "complete") {
		processRunner(e);
	}
});
document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		processRunner(event);
	}
});
