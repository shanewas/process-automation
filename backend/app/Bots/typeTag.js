const { ipcMain } = require("electron");

function tagging(mainWindow) {
	ipcMain.on("idSeq", function (e, args) {
		if (
			(args.tagName === "INPUT" || args.tagName === "SELECT") &&
			args.type != "submit"
		) {
			args["_type"] = "LoadData";
		} else if (args.tagName === "KeyPress") {
			args["_type"] = "KeyBoard";
		} else if (args.tagName === "ScreenShot") {
			args["_type"] = "ScreenShot";
		} else {
			args["_type"] = "click";
		}
		mainWindow.webContents.send("process-link", args);
	});
}

module.exports = { tagging };
