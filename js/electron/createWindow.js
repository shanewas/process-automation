const electron = require("electron");
const path = require("path");

const { BrowserWindow } = electron;
let window;
function createWindow(loadurl, preload = false) {
	// create new window
	window = new BrowserWindow({
		width: 1200,
		height: 1000,
		minWidth: 300,
		frame: true,
		show: false,
		title: "Aiw Core",
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			plugins: true,
			preload: preload ? path.join(__dirname, "preload.js") : null
		}
	});
	// window.loadURL(
	//   url.format({
	//     pathname: path.join(__dirname, "../views/index.html"),
	//     protocol: "file:",
	//     slashes: true
	//   })
	// );

	window.loadURL(loadurl);
	return window;
}

module.exports = { createWindow };
