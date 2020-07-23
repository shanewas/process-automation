const { ipcMain } = require("electron");
const botlist = require("../../controller/local/local");
function botHandler() {
  ipcMain.handle("bot-name", async (event, botName) => {
    const result = await botlist.fetchBot(botName);
    return result;
  });

  ipcMain.handle("add-bot", async (event, botName, botType) => {
    const result = await botlist.addBot(botName, botType);
    return result;
  });

  ipcMain.on("remove-bot", async (event, botName) => {
    await botlist.removeBot(botName);
  });

  ipcMain.on("update-bot-process", async (event, botName, BOTPROCESS) => {
    await botlist.updateBotProcess(botName, BOTPROCESS);
  });

  ipcMain.on("update-bot", async (event, botName, saveBotObj) => {
    await botlist.editBot(
      botName,
      saveBotObj.filepath,
      saveBotObj.headers,
      saveBotObj.status,
      saveBotObj.botIteration,
      saveBotObj.variables
    );
  });

  ipcMain.handle("bots", async (event) => {
    const result = await botlist.listAllBots();
    return result;
  });
}

module.exports = { botHandler };
