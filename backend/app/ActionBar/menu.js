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
module.exports = { mainMenuTempate };
