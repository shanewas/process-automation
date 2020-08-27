const isDev = require("electron-is-dev");
const { BrowserWindow } = require("electron");
const path = require("path");

const splashWindow = new BrowserWindow({
	width: 500,
	height: 300,
	modal: true,
	frame: false,
	show: false,
	title: "AIW Core",
	icon: path.join(__dirname, "../../../logo.png"),
	alwaysOnTop: true,
	fullscreen: false,
	fullscreenable: false,
	opacity: 1.0,
	transparent: true,
	skipTaskbar: true,
	autoHideMenuBar: true,
	resizable: false,
	movable: false,
});
splashWindow.loadURL(
	isDev
		? "http://localhost:4000/splash.html"
		: `file://${path.join(__dirname, "../../frontend/build/splash.html")}`
);
splashWindow.setIgnoreMouseEvents(true);
splashWindow.setFocusable(false);

module.exports = { splashWindow };
