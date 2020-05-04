const electron = require("electron");
const path = require("path");

const { BrowserWindow } = electron;
let window;
function createWindow(loadurl, parent = null, modal = false, frame = true, preload = false, payload = "preload.js") {
	// create new window
	window = new BrowserWindow({
		parent:parent,
		width: 1200,
		height: 1000,
		minWidth: 300,
		modal: modal,
		frame: frame,
		show: false,
		title: "AIW Core",
		icon: path.join(__dirname, "../../logo.png"),
		webPreferences: {
			webSecurity: true,
			nodeIntegration: true,
			plugins: true,
			preload: preload ? path.join(__dirname, payload) : null,
		},
	});
	// window.loadURL(
	//   url.format({
	//     pathname: path.join(__dirname, "../views/index.html"),
	//     protocol: "file:",
	//     slashes: true
	//   })
	// );

	if (loadurl == "none") {
		return window;
	} else {
		window.loadURL(loadurl);
		return window;
	}
}

module.exports = { createWindow };
