const crypto = require("crypto");
const algorithm = "aes-256-ctr";
let key = process.env.KEY;
key = crypto
  .createHash("sha256")
  .update(String(key))
  .digest("base64")
  .substr(0, 32);
const path = require("path");
const electron = require("electron");
const Tesseract = require("tesseract.js");
const Jimp = require("jimp");

const { app, Menu, ipcMain, dialog, Notification, BrowserWindow } = electron;

let splashWindow;
function splashScreen() {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 300,
    modal: true,
    frame: false,
    show: false,
    title: "AIW Core",
    icon: path.join(__dirname, "../../logo.png"),
    alwaysOnTop: true,
    fullscreen: false,
    fullscreenable: false,
    opacity: 1.0,
    transparent: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    resizable: false,
    movable: false,
  });
  splashWindow.loadURL(
    isDev
      ? "http://localhost:4000/splash.html"
      : `file://${path.join(__dirname, "../../frontend/build/splash.html")}`
  );
  splashWindow.setIgnoreMouseEvents(true);
  splashWindow.setFocusable(false);
  splashWindow.show();
}
const csv = require("csv-parser");
const isDev = require("electron-is-dev");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const botlist = require("../controller/local/dbScript");
const conf = require("./ActionBar/config");
const menu = require("./ActionBar/menu");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

let {
  win,
  contectWindow,
  loadingWindow,
} = require("./WindowManagement/windowList");
let window = require("./WindowManagement/createWindows");

let browser;
let LINKALREADYOPENED = false;
let BOTALREADYOPENED = false;
var BOTS;
var BOTPROCESS;
var DATA = [];
var ITERATION = 1;
var BOT_VARIABLES = [];
var PROCESSLENGTH = 0;
var PROCESSCOUNTER = 0;
var LOCALDATA;
var IDX;
var ERRSTATUS = [];
var RUNINGSTATUS = false;

function reset_var() {
  BOTS = null;
  BOTPROCESS = null;
  DATA = [];
  ITERATION = 1;
  BOT_VARIABLES = [];
  PROCESSLENGTH = 0;
  PROCESSCOUNTER = 0;
  LOCALDATA = null;
  IDX = 0;
  ERRSTATUS = [];
  RUNINGSTATUS = false;
}

function generateMainWindow() {
  win = window.createWindow(
    isDev
      ? "http://localhost:4000"
      : `file://${path.join(__dirname, "../../frontend/build/index.html")}`,
    null,
    false,
    true,
    false
  );
  win.once("ready-to-show", function () {
    setTimeout(() => {
      win.maximize();
      win.show();
      splashWindow.hide();
      splashWindow.destroy();
    }, 1000);
  });
  // Build menu
  const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
  // Inset menu
  Menu.setApplicationMenu(mainMenu);

  win.on(
    "closed",
    () => ((window = null), (loadingWindow = null), (contectWindow = null))
  );
}
ipcMain.on("search-link", function (event, args) {
  let procSeq = {
    ocr: false,
    label: "",
    link: "",
    variableField: "",
    saveToVariable: "",
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
  win.webContents.send("process-link", args);
});

ipcMain.on("start-bot", async function (e, botName) {
  let botsReady = false;
  let procSeqReady = false;
  let fileReady = false;
  reset_var();
  if (!BOTALREADYOPENED) {
    BOTALREADYOPENED = true;
    loadingWindow = window.createWindow(
      isDev
        ? "http://localhost:4000/loading.html"
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
        ? "http://localhost:4000/loading.html"
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

ipcMain.on("need-process", async function (e) {
  let isLoading = false;
  let autoLoad = false;
  let page = await pie.getPage(browser, loadingWindow, false).catch((err) => {
    isLoading = true;
  });
  let myNotification = new Notification("Title", {
    body: "Lorem Ipsum Dolor Sit Amet",
  });

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
  if (RUNINGSTATUS && !isLoading) {
    if (Math.floor(ITERATION / 2) === IDX && PROCESSCOUNTER == 0) {
      let notification = await botlist.setNotification(
        BOTS.botName,
        "log",
        " has completed half its task",
        "null"
      );
      win.webContents.send("notification-single", notification);
    }
    if (IDX < ITERATION) {
      console.log(`*** Iteration No. #${IDX} running ***`);
      console.log(`*** Currently on No. #${PROCESSCOUNTER} flowchart item ***`);
      element = BOTPROCESS.processSequence[PROCESSCOUNTER];
      let elements,
        dat,
        conditionStatus = true;
      try {
        switch (element._type) {
          case "LoadData":
            switch (element.entryType) {
              case "manual":
                dat = element.dataEntry;
                break;
              case "variable":
                let variable_obj = BOT_VARIABLES.find(
                  (o) => o.name === element.dataEntry
                );
                dat = variable_obj.value;
                break;
              case "dataHeader":
                dat = LOCALDATA[element.dataEntry];
                break;
              default:
                break;
            }
            // conditions: [
            // {
            //     el1: '1',
            //     el1isManual: true,
            //     el1headerIdx: null,
            //     el2: '1',
            //     el2isManual: true,
            //     el2headerIdx: null,
            //     operator: '=',
            //     id: 'nBsg_r-5o'
            // }
            // ],
            console.log(`sending data to load ...`);
            if (element.conditions) {
              console.log(`checking conditions ...`);
              element.conditions.forEach((elem) => {
                if (!elem.el1isManual) {
                  firstCond = LOCALDATA[elem.el1];
                } else {
                  firstCond = elem.el1;
                }
                if (!elem.el2isManual) {
                  secondCond = LOCALDATA[elem.el2];
                } else {
                  secondCond = elem.el2;
                }
                switch (elem.operator) {
                  case "=":
                    if (!(firstCond === secondCond)) {
                      console.log(firstCond);
                      console.log(secondCond);
                      conditionStatus = false;
                    } else {
                      console.log(firstCond);
                      console.log(secondCond);
                    }
                    break;
                  case ">":
                    if (!(firstCond > secondCond)) {
                      console.log(firstCond);
                      console.log(secondCond);
                      conditionStatus = false;
                    } else {
                      console.log(firstCond);
                      console.log(secondCond);
                    }
                    break;
                  case "<":
                    if (!(firstCond < secondCond)) {
                      console.log(firstCond);
                      console.log(secondCond);
                      conditionStatus = false;
                    } else {
                      console.log(firstCond);
                      console.log(secondCond);
                    }
                    break;
                  default:
                    break;
                }
              });
            }
            if (conditionStatus) {
              if (element.type === "radio" || element.type === "checkbox") {
                if (element.ext.label === dat) {
                  elements = await page.$x(element.xpath, {
                    visible: true,
                  });
                  await elements[0].click();
                } else {
                  loadingWindow.webContents.send("next-process");
                  break;
                }
              } else {
                elements = await page.$x(element.xpath);
                await elements[0].type(dat);
              }
            }
            loadingWindow.webContents.send("next-process");
            break;
          case "click":
            console.log("clicking element ...");
            elements = await page.$x(element.xpath);
            await elements[0].click();
            loadingWindow.webContents.on("will-navigate", (event, url) => {
              autoLoad = true;
            });
            break;
          case "KeyBoard":
            console.log(`Pressing ${element.value} ...`);
            elements = await page.$x(element.xpath);
            await elements[0].press(`${element.value}`);
            loadingWindow.webContents.on("will-navigate", (event, url) => {
              autoLoad = true;
            });
            break;
          case "Extract Data":
            extracted_data = element[element.variableField];
            let variable_obj = BOT_VARIABLES.find(
              (o) => o.name === element.saveToVariable
            );
            variable_obj.value = extracted_data;
            loadingWindow.webContents.send("next-process");
            console.log("Extracted Data " + extracted_data);
            break;
          case "ScreenShot":
            console.log(`Taking screenshot ...`);
            console.log(`will saving to ${element.imgpath}`);
            if (!fs.existsSync(element.imgpath)) {
              fs.mkdirSync(element.imgpath);
            }
            let img_filename = `${BOTS.botName}_${IDX}${PROCESSCOUNTER}.jpeg`;
            let pathTo = path.join(element.imgpath, img_filename);
            await page.evaluate((element) => {
              window.scroll(0, element.param.Yaxis);
            }, element);
            await page
              .screenshot({
                path: pathTo,
                type: "jpeg",
                clip: {
                  x: element.param.Xaxis,
                  y: element.param.Yaxis,
                  width: element.param.width,
                  height: element.param.height,
                },
              })
              .then(async () => {
                if (element.ocr) {
                  await Jimp.read(pathTo)
                    .then((screenshot) => {
                      let ocr_img_filename = `${BOTS.botName}_OCR_${IDX}${PROCESSCOUNTER}.jpeg`;
                      let ocr_pathTo = path.join(
                        element.imgpath,
                        "ocr_images/",
                        ocr_img_filename
                      );
                      return screenshot
                        .quality(100)
                        .brightness(0.5)
                        .contrast(0.5)
                        .greyscale()
                        .invert()
                        .write(ocr_pathTo);
                    })
                    .then(async () => {
                      if (!fs.existsSync(element.ocrpath)) {
                        fs.mkdirSync(element.ocrpath);
                      }
                      let ocr_filename = `${BOTS.botName}_${IDX}${PROCESSCOUNTER}.txt`;
                      let saveTo = path.join(element.ocrpath, ocr_filename);
                      await Tesseract.recognize(pathTo, "eng", {
                        logger: (m) => console.log(m),
                      }).then(async ({ data: { text } }) => {
                        console.log(text);
                        let variable_obj = BOT_VARIABLES.find(
                          (o) => o.name === element.saveToVariable
                        );
                        variable_obj.value = text;
                        fs.writeFile(saveTo, text, (err) => {
                          err
                            ? console.log("Canceled!")
                            : console.log("Saved!");
                        });
                      });
                    })
                    .catch((err) => {
                      throw err;
                    });
                }
              })
              .finally(() => {
                loadingWindow.webContents.send("next-process");
              });
            break;
          case "link":
            console.log("loading url ... " + page.url());
            await page.goto(element.link);
            break;
          default:
            console.log("_type doesnt match");
        }
      } catch (error) {
        var errorGen = {
          datatime: new Date(),
          type: element._type,
          DataLength: `#${DATA.length}`,
          CurrentDataRow: `${JSON.stringify(LOCALDATA)}`,
          Iteration: `#${IDX}`,
          ProcCount: `#${PROCESSCOUNTER}`,
          ProcSeq_elem: element,
          Error: error,
        };
        ERRSTATUS.push(errorGen);
        console.log(ERRSTATUS);
        let notification = await botlist.setNotification(
          BOTS.botName,
          "error",
          ` is facing an issue with #${PROCESSCOUNTER} process in #${IDX} Iteration`,
          "null"
        );
        win.webContents.send("notification-single", notification);
        // loadingWindow.webContents.send("next-process-state-change");
      }
      if (PROCESSCOUNTER + 1 >= PROCESSLENGTH) {
        PROCESSCOUNTER = 0;
        if (BOTS.filepath) LOCALDATA = DATA.pop();
        IDX++;
      } else {
        PROCESSCOUNTER++;
        if (!autoLoad) {
          loadingWindow.webContents.send("next-process");
        }
      }
    } else {
      let notification = await botlist.setNotification(
        BOTS.botName,
        "log",
        " has completed its task",
        "null"
      );
      win.webContents.send("notification-single", notification);
      win.setProgressBar(0.0);
      reset_var();
      BOTALREADYOPENED = false;
      loadingWindow.hide();
      loadingWindow.destroy();
    }
    win.setProgressBar(IDX / ITERATION);
  }
});

const main = async () => {
  await pie.initialize(app);
  browser = await pie.connect(app, puppeteer);
};
main();
app.on("ready", () => {
  splashScreen();
  generateMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    generateMainWindow();
  }
});

conf.config();

//data COM
ipcMain.handle("notification-multi", async (event, notiNumber) => {
  const result = await botlist.getNotification(notiNumber);
  return result;
});
ipcMain.handle("bots", async (event) => {
  const result = await botlist.listAllBots();
  return result;
});

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

ipcMain.on("update-bot", async (event, botName, bot) => {
  await botlist.editBot(
    botName,
    bot
    // saveBotObj.filepath,
    // saveBotObj.headers,
    // saveBotObj.status,
    // saveBotObj.botIteration,
    // saveBotObj.variables
  );
});

ipcMain.handle("get-process", async (event, botName) => {
  const result = await botlist.getProcessSequence(botName);
  return result;
});

ipcMain.on("file-analytics", async (event, filepath) => {
  const { size } = fs.statSync(filepath);
  const results = [];
  let analytics = {};
  fs.createReadStream(filepath, { bufferSize: 64 * 1024 })
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      analytics = {
        path: filepath,
        size: size,
        rowNumber: results.length,
        type: "text/csv",
      };
      event.returnValue = analytics;
    });
});

ipcMain.on("code-generation", async (event, file) => {
  let options = {
    title: "Save Generated Python File",
    buttonLabel: "Save Script",
    filters: [
      { name: "Python", extensions: ["py"] },
      { name: "All Files", extensions: ["*"] },
    ],
  };
  const save = dialog.showSaveDialog(win, options);
  fs.writeFile((await save).filePath, file, function (err) {
    if (err) console.log("Canceled!");
    else console.log("Saved!");
  });
});

//OCR Module

ipcMain.on("ocr-engine", async (event) => {
  let upload_options = {
    title: "Optical character recognition",
    buttonLabel: "Upload",
    filters: [{ name: "Images", extensions: ["jpg", "png"] }],
  };
  let save_options = {
    title: "Save OCR results",
    buttonLabel: "Save",
    filters: [
      { name: "Text", extensions: ["txt"] },
      { name: "All Files", extensions: ["*"] },
    ],
  };
  (await dialog.showOpenDialog(win, upload_options)).filePaths.forEach(
    (path) => {
      Jimp.read(path)
        .then((image) => {
          return (
            image
              .quality(60)
              .brightness(0.1)
              .contrast(0.1)
              .greyscale()
              // .invert()
              .write(path)
          ); // save
        })
        .then(async () => {
          Tesseract.recognize(path, "eng", {
            logger: (m) => console.log(m),
          }).then(async ({ data: { text } }) => {
            console.log(text);
            fs.writeFile(
              (await dialog.showSaveDialog(win, save_options)).filePath,
              text,
              (err) => {
                err ? console.log("Canceled!") : console.log("Saved!");
              }
            );
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  );
});

// Internet Status

ipcMain.on("online-status-changed", (event, status) => {
  console.log(status);
});

// for bot export

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
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return result;
};
