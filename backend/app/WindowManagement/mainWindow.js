const isDev = require("electron-is-dev");
const path = require("path");
const { createWindow } = require("./window");

require("dotenv").config();

let mainWindow = createWindow(
	isDev
		? `http://localhost:${process.env.PORT}`
		: `file://${path.join(
				__dirname,
				"..",
				"..",
				"..",
				"frontend",
				"build",
				"index.html"
		  )}`,
	null,
	false,
	true,
	true,
	"/script/load.js"
);

function splash(splashScreen) {
	mainWindow.once("ready-to-show", function () {
		mainWindow.maximize();
		mainWindow.show();
		splashScreen.hide();
		splashScreen.destroy();
	});

	mainWindow.on("closed", () => (mainWindow = null));
}

module.exports = { mainWindow, splash };
