ipcMain.on("start-bot", async function (e, botName) {
	let botsReady = false;
	let procSeqReady = false;
	let fileReady = false;
	reset_var();
	if (!BOTALREADYOPENED) {
		BOTALREADYOPENED = true;
		loadingWindow = window.createWindow(
			isDev
				? `http://localhost:${process.env.PORT}/loading.html`
				: `file://${path.join(__dirname, "../../frontend/build/loading.html")}`,
			win,
			false,
			true,
			true,
			"RunningBot.js"
		);
	} else {
		loadingWindow.destroy();
		loadingWindow = window.createWindow(
			isDev
				? `http://localhost:${process.env.PORT}/loading.html`
				: `file://${path.join(__dirname, "../../frontend/build/loading.html")}`,
			win,
			false,
			true,
			true
		);
	}
	loadingWindow.setResizable(false);
	loadingWindow.on("close", (e) => {
		BOTALREADYOPENED = false;
		e.preventDefault();
		reset_var();
		win.setProgressBar(0.0);
		loadingWindow.hide();
		loadingWindow.destroy();
	});
	loadingWindow.maximize();
	loadingWindow.show();
	await botlist
		.GetBot(botName)
		.then((docs) => {
			BOTS = docs;
		})
		.then(async () => {
			botsReady = true;
			let notification = await botlist.setNotification(
				botName,
				"log",
				" initiated",
				"null"
			);
			win.webContents.send("notification-single", notification);
		});
	if (BOTS.filepath) {
		fs.createReadStream(BOTS.filepath, { bufferSize: 64 * 1024 })
			.pipe(csv())
			.on("data", (row) => {
				DATA.push(row);
			})
			.on("end", async () => {
				console.log("CSV file successfully processed");
				//inital pop from datacsv to LOCALDATA
				LOCALDATA = DATA.pop();
				fileReady = true;
				let notification = await botlist.setNotification(
					botName,
					"log",
					" is file ready",
					"null"
				);
				win.webContents.send("notification-single", notification);
			});
	} else {
		fileReady = true;
	}
	await botlist
		.GetProcess(botName)
		.then((docs) => {
			BOTPROCESS = docs;
			PROCESSLENGTH = BOTPROCESS.processSequence.length;
		})
		.then(async () => {
			procSeqReady = true;
			let notification = await botlist.setNotification(
				botName,
				"log",
				"'s process sequence is initiated",
				"null"
			);
			win.webContents.send("notification-single", notification);
		});
	ITERATION = BOTS.botIteration;
	BOT_VARIABLES = BOTS.variables;
	console.log(`Bot is commencing ${ITERATION} iteration`);
	IDX = 0;
	botlist.setLastActiveTime(botName);
	if (botsReady && procSeqReady && fileReady) {
		RUNINGSTATUS = true;
		let notification = await botlist.setNotification(
			botName,
			"log",
			" is starting",
			"null"
		);
		win.webContents.send("notification-single", notification);
	} else {
		console.log(
			`Bots Ready Status : ${botsReady} - Process Ready Status : ${[
				procSeqReady,
			]} ${BOTS.filepath ? `- File Ready Status : ${fileReady}` : null}`
		);
		let notification = await botlist.setNotification(
			botName,
			"log",
			`Bots : ${botsReady ? "Ready" : "Not Ready"} \n Process : ${
				procSeqReady ? "Ready" : "Not Ready"
			} ${
				BOTS.filepath ? `\n File : ${fileReady ? "Ready" : "Not Ready"}` : null
			}`,
			"null"
		);
		win.webContents.send("notification-single", notification);
		BOTALREADYOPENED = false;
		e.preventDefault();
		reset_var();
		win.setProgressBar(0.0);
		loadingWindow.hide();
		loadingWindow.destroy();
	}
});
