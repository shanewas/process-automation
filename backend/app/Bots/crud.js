const { ipcMain } = require("electron");
const {
  fetchBot,
  addBot,
  removeBot,
  updateBotProcess,
  editBot,
  listAllBots,
  getProcessSequence,
} = require("../../controller/local/dbScript");

ipcMain.handle("add-bot", async (event, botName, botType) => {
  return await addBot(botName, botType);
});

ipcMain.on("add-step", async (event, botName, botType, index) => {
  let result = await getProcessSequence(botName);
  result.splice(index, 0, {
    _type: botType,
  });
  await updateBotProcess(botName, result);
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

ipcMain.on("update-bot", async (event, botName, bot) => {
  await editBot(
    botName,
    bot
    // saveBotObj.filepath,
    // saveBotObj.headers,
    // saveBotObj.status,
    // saveBotObj.botIteration,
    // saveBotObj.variables
  );
});

ipcMain.on("remove-bot", async (event, botName) => {
  await removeBot(botName);
});

ipcMain.handle("get-process", async (event, botName) => {
  const result = await getProcessSequence(botName);
  return result;
});
