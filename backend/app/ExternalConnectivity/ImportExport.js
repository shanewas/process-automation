function importExportHandler() {
  const crypto = require("crypto");
  const algorithm = "aes-256-ctr";
  let key = process.env.KEY;
  key = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);

  ipcMain.on("export-bot", async (event, botName) => {
    let options = {
      title: "Export AIW Project",
      buttonLabel: "Export",
      filters: [{ name: "AIW Project", extensions: ["aiw"] }],
    };
    const bot = await botlist.fetchBot(botName);
    const process = await botlist.getProcessSequence(botName);
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

  // for bot import

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
          await botlist.addBot(obj.bot.botName, obj.bot.botType);
          await botlist.editBot(
            obj.bot.botName,
            obj.bot.filepath,
            obj.bot.header,
            obj.bot.status,
            obj.bot.botIteration
          );
          await botlist.updateBotProcess(obj.bot.botName, obj.process);
          event.reply("import-complete");
        }
      });
    }
  });

  const encrypt = (buffer) => {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
  };

  const decrypt = (encrypted) => {
    // Get the iv: the first 16 bytes
    const iv = encrypted.slice(0, 16);
    // Get the rest
    encrypted = encrypted.slice(16);
    // Create a decipher
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Actually decrypt it
    const result = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return result;
  };
}
module.exports = { importExportHandler };
