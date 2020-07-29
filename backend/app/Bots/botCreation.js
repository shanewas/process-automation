ipcMain.on("search-link", function (event, args) {
	let procSeq = {
		ocr: false,
		label: "",
		link: "",
		variableField: "",
		variableName: "",
		variableUsed: "",
		entryType: "manual",
		dataEntry: "",
		type: "",
		value: "",
		xpath: "",
		tagName: `Web Link`,
		placeholder: `Link to load "${
			args.includes("https://") || args.includes("http://")
				? args
				: `https://${args}`
		}"`,
		link:
			args.includes("https://") || args.includes("http://")
				? args
				: `https://${args}`,
		// TODO: REMOVE THIS
		ext: {
			label: undefined,
		},
		_type: `link`,
	};
	if (!LINKALREADYOPENED) {
		LINKALREADYOPENED = true;
		contectWindow = window.createWindow(procSeq.link, win, false, true, true);
	} else {
		contectWindow.destroy();
		contectWindow = window.createWindow(procSeq.link, win, false, true, true);
	}
	contectWindow.setResizable(false);
	contectWindow.on("close", (e) => {
		LINKALREADYOPENED = false;
		e.preventDefault();
		contectWindow.hide();
		contectWindow.destroy();
	});
	contectWindow.webContents.on("dom-ready", function (e) {
		contectWindow.maximize();
		contectWindow.show();
	});
	win.webContents.send("process-link", procSeq);
});
