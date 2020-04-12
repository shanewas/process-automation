// const electron = require("electron");
const electron = window.require("electron");
const { ipcRenderer } = electron;

function send(teleport, content) {
	ipcRenderer.send(teleport, content);
}

function tests() {
	return 2;
}

window.onload = function () {
	const test = document.getElementById("test");
	test.addEventListener("click", function () {
		send("show-window", tests());
	});
};
