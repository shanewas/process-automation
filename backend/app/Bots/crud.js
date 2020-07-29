const { ipcMain } = require("electron");
const {
	fetchBot,
	addBot,
	removeBot,
	updateBotProcess,
	editBot,
	listAllBots,
} = require("../../controller/local/dbScript");

ipcMain.handle("add-bot", async (event, botName, botType) => {
	return await addBot(botName, botType);
});

ipcMain.handle("bots", async (event) => {
	return await listAllBots();
});

ipcMain.handle("bot-name", async (event, botName) => {
	return await fetchBot(botName);
});

ipcMain.on("update-bot-process", async (event, botName, BOTPROCESS) => {
	await updateBotProcess(botName, BOTPROCESS);
});

ipcMain.on("update-bot", async (event, botName, saveBotObj) => {
	await editBot(
		botName,
		saveBotObj.filepath,
		saveBotObj.headers,
		saveBotObj.status,
		saveBotObj.botIteration,
		saveBotObj.variables
	);
});

ipcMain.on("remove-bot", async (event, botName) => {
	await removeBot(botName);
});
