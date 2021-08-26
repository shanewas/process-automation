const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const { encrypt, decrypt } = require("./encryption");
const {
	addBot,
	editBot,
	fetchBot,
	getProcessSequence,
	updateBotProcess,
} = require("../../controller/local/dbScript");
let win;
function getWindow(window) {
	this.win = window;
}
//EXPORT bot process
ipcMain.on("export-bot", async (event, botName) => {
	let options = {
		title: "Export AIW Project",
		buttonLabel: "Export",
		filters: [{ name: "AIW Project", extensions: ["aiw"] }],
	};
	const bot = await fetchBot(botName);
	const process = await getProcessSequence(botName);
	let project = {
		bot: bot,
		process: process,
	};
	project = JSON.stringify(project);
	const encrypted = encrypt(project);
	const save = dialog.showSaveDialog(win, options);
	fs.writeFile((await save).filePath, encrypted, function (err) {
		if (err) console.log("Canceled!");
		else console.log("Exported!");
	});
});

//IMPORT bot process
ipcMain.on("import-bot", async (event) => {
	let options = {
		title: "Export AIW Project",
		buttonLabel: "Import",
		filters: [{ name: "AIW Project", extensions: ["aiw"] }],
		// properties: ['openFile', 'multiSelections']
	};
	const save = dialog.showOpenDialog(win, options);
	let paths = (await save).filePaths;
	for (const file of paths) {
		await fs.readFile(file, async (err, data) => {
			if (err) console.log("Canceled!");
			else {
				const decrypted = decrypt(data);
				obj = JSON.parse(decrypted);
				await addBot(obj.bot.botName, obj.bot.botType);
				await editBot(
					obj.bot.botName,
					obj.bot.filepath,
					obj.bot.header,
					obj.bot.status,
					obj.bot.botIteration
				);
				await updateBotProcess(obj.bot.botName, obj.process);
				event.reply("import-complete");
			}
		});
	}
});

module.exports = { getWindow };
