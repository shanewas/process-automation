const isDev = require("electron-is-dev");

const electron = require("electron");
const { app } = electron;

const mainMenuTempate = [
	{
		label: "Home",
		submenu: [
			{
				label: "Web Scrapping",
				click() {
					// windowCollection.createAddWindow()
				},
			},
			{
				label: "Quit",
				accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				},
			},
		],
	},
	{
		label: "Help",
	},
];

//if mac add empty onject with menu
if (process.platform === "darwin") {
	mainMenuTempate.unshift({});
}

//Add developer tools inf not in prod
if (isDev) {
	mainMenuTempate.push({
		label: "Developer Tools",
		submenu: [
			{
				label: "Toggle DevTools",
				accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
			},
			{
				role: "reload",
			},
		],
	});
}

module.exports = { mainMenuTempate };
