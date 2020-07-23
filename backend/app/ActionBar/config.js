const isDev = require("electron-is-dev");
const { mainMenuTempate } = require("./menu");

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
