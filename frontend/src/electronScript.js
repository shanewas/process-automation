// const electron = require("electron");
const electron = window.require("electron");
const { ipcRenderer } = electron;

window.onload = function () {
	const test = document.getElementById("test");
	test.addEventListener("click", function () {
		ipcRenderer.send("show-window");
	});
};
