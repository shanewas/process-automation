const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const PIE = require("puppeteer-in-electron");
const Tesseract = require("tesseract.js");
const Jimp = require("jimp");
const csv = require("csv-parser");

const { createWindow } = require("../app/WindowManagement/window");
const {
  GetBot,
  GetProcess,
  setLastActiveTime,
  setNotification,
} = require("../controller/local/dbScript");

let loadingWindow;

async function start_bot(botName, mainWindow, PARAMS) {
  let botsReady = false;
  let procSeqReady = false;
  let fileReady = false;
  PARAMS.reset_var();
  if (!PARAMS.BOTALREADYOPENED) {
    PARAMS.BOTALREADYOPENED = true;
    loadingWindow = createWindow(
      isDev
        ? `http://localhost:${process.env.PORT}/loading.html`
        : `file://${path.join(__dirname, "../../frontend/build/loading.html")}`,
      mainWindow,
      false,
      true,
      true,
      "/script/RunningBot.js"
    );
  } else {
    loadingWindow.destroy();
    loadingWindow = createWindow(
      isDev
        ? `http://localhost:${process.env.PORT}/loading.html`
        : `file://${path.join(__dirname, "../../frontend/build/loading.html")}`,
      mainWindow,
      false,
      true,
      true
    );
  }
  loadingWindow.setResizable(false);
  loadingWindow.on("close", (e) => {
    PARAMS.BOTALREADYOPENED = false;
    e.preventDefault();
    PARAMS.reset_var();
    mainWindow.setProgressBar(0.0);
    loadingWindow.hide();
    loadingWindow.destroy();
  });
  loadingWindow.maximize();
  loadingWindow.show();
  await GetBot(botName)
    .then((docs) => {
      PARAMS.BOTS = docs;
    })
    .then(async () => {
      botsReady = true;
      let notification = await setNotification(
        botName,
        "log",
        " initiated",
        "null"
      );
      mainWindow.webContents.send("notification-single", notification);
    });
  if (PARAMS.BOTS.filepath) {
    fs.createReadStream(PARAMS.BOTS.filepath, { bufferSize: 64 * 1024 })
      .pipe(csv())
      .on("data", (row) => {
        PARAMS.DATA.push(row);
      })
      .on("end", async () => {
        console.log("CSV file successfully processed");
        //inital pop from datacsv to LOCALDATA
        PARAMS.LOCALDATA = PARAMS.DATA.pop();
        fileReady = true;
        let notification = await setNotification(
          botName,
          "log",
          " is file ready",
          "null"
        );
        mainWindow.webContents.send("notification-single", notification);
      });
  } else {
    fileReady = true;
  }
  await GetProcess(botName)
    .then((docs) => {
      PARAMS.BOTPROCESS = docs;
      PARAMS.PROCESSLENGTH = PARAMS.BOTPROCESS.processSequence.length;
    })
    .then(async () => {
      procSeqReady = true;
      let notification = await setNotification(
        botName,
        "log",
        "'s process sequence is initiated",
        "null"
      );
      mainWindow.webContents.send("notification-single", notification);
    });
  PARAMS.ITERATION = PARAMS.BOTS.botIteration;
  PARAMS.BOT_VARIABLES = PARAMS.BOTS.variables;
  console.log(`Bot is commencing ${PARAMS.ITERATION} iteration`);
  IDX = 0;
  setLastActiveTime(botName);
  if (botsReady && procSeqReady && fileReady) {
    PARAMS.RUNINGSTATUS = true;
    let notification = await setNotification(
      botName,
      "log",
      " is starting",
      "null"
    );
    mainWindow.webContents.send("notification-single", notification);
  } else {
    console.log(
      `Bots Ready Status : ${botsReady} - Process Ready Status : ${[
        procSeqReady,
      ]} ${PARAMS.BOTS.filepath ? `- File Ready Status : ${fileReady}` : null}`
    );
    let notification = await setNotification(
      botName,
      "log",
      `Bots : ${botsReady ? "Ready" : "Not Ready"} \n Process : ${
        procSeqReady ? "Ready" : "Not Ready"
      } ${
        PARAMS.BOTS.filepath
          ? `\n File : ${fileReady ? "Ready" : "Not Ready"}`
          : null
      }`,
      "null"
    );
    mainWindow.webContents.send("notification-single", notification);
    PARAMS.BOTALREADYOPENED = false;
    e.preventDefault();
    PARAMS.reset_var();
    mainWindow.setProgressBar(0.0);
    loadingWindow.hide();
    loadingWindow.destroy();
  }
}

async function run_bot(BROWSER, mainWindow, PARAMS) {
  let isLoading = false;
  let autoLoad = false;
  let page = await PIE.getPage(BROWSER, loadingWindow, false).catch((err) => {
    isLoading = true;
  });

  if (PARAMS.RUNINGSTATUS && !isLoading) {
    if (
      Math.floor(PARAMS.ITERATION / 2) === PARAMS.IDX &&
      PARAMS.PROCESSCOUNTER == 0
    ) {
      let notification = await setNotification(
        PARAMS.BOTS.botName,
        "log",
        " has completed half its task",
        "null"
      );
      mainWindow.webContents.send("notification-single", notification);
    }
    if (PARAMS.IDX < PARAMS.ITERATION) {
      console.log(`*** Iteration No. #${IDX} running ***`);
      console.log(
        `*** Currently on No. #${PARAMS.PROCESSCOUNTER} flowchart item ***`
      );
      element = PARAMS.BOTPROCESS.processSequence[PARAMS.PROCESSCOUNTER];
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
                let variable_obj = PARAMS.BOT_VARIABLES.find(
                  (o) => o.name === element.dataEntry
                );
                dat = variable_obj.value;
                break;
              case "dataHeader":
                dat = PARAMS.LOCALDATA[element.dataEntry];
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
                  firstCond = PARAMS.LOCALDATA[elem.el1];
                } else {
                  firstCond = elem.el1;
                }
                if (!elem.el2isManual) {
                  secondCond = PARAMS.LOCALDATA[elem.el2];
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
                // elements = await page.$x(element.xpath);
                // await elements[0].type(dat);
                await page
                  .waitForXPath(element.xpath, { visible: true })
                  .then(async () => {
                    elements = await page.$x(element.xpath);
                    await elements[0].type(dat);
                  });
              }
            }
            loadingWindow.webContents.send("next-process");
            break;
          case "click":
            console.log("clicking element ...");
            // elements = await page.$x(element.xpath);
            // await elements[0].click();
            // loadingWindow.webContents.on(
            //   "did-frame-finish-load",
            //   (event, isMainFrame, frameProcessId, frameRoutingId) => {}
            // );
            // await Promise.all([
            //   // page.click("button[type=submit]"),
            //   elements[0].waitForSelector(),
            //   elements[0].click(),
            //   page.waitForNavigation({ timeout: 500 }),
            // ]);
            await page
              .waitForXPath(element.xpath, { visible: true })
              .then(async () => {
                elements = await page.$x(element.xpath);
                await elements[0].click();
              });
            // const [response] = await Promise.all([
            //   page.waitForNavigation(), // The promise resolves after navigation has finished
            //   // page.click("a.my-link"), // Clicking the link will indirectly cause a navigation
            //   await elements[0].click(),
            // ]);
            // await elements[0].click().then(async () => {
            //   await page.waitForNavigation({ timeout: 1000 });
            // });
            loadingWindow.webContents.on("will-navigate", (event, url) => {
              autoLoad = true;
            });
            break;
          case "upload":
            console.log("uploading element ...");
            console.log("done -1");
            fs.readdir(element.folderPath, async function (err, files) {
              if (err) console.log(err);
              else {
                console.log("done 0");

                elements = await page.$x(element.xpath);
                const [fileChooser] = await Promise.all([
                  page.waitForFileChooser(),
                  await elements[0].click(),
                ]).finally(() => {
                  console.log("done 1");
                });
                await fileChooser
                  .accept([path.join(element.folderPath, files[1])])
                  .then(() => {
                    console.log("done 2");
                    loadingWindow.webContents.send("next-process");
                  });
              }
            });
            console.log("done 3");
            break;
          case "download":
            console.log("downloading element ...");
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
            let variable_obj = PARAMS.BOT_VARIABLES.find(
              (o) => o.name === element.variableName
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
            let img_filename = `${PARAMS.BOTS.botName}_${PARAMS.IDX}${PARAMS.PROCESSCOUNTER}.jpeg`;
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
                      let ocr_img_filename = `${PARAMS.BOTS.botName}_OCR_${PARAMS.IDX}${PARAMS.PROCESSCOUNTER}.jpeg`;
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
                      let ocr_filename = `${PARAMS.BOTS.botName}_${PARAMS.IDX}${PARAMS.PROCESSCOUNTER}.txt`;
                      let saveTo = path.join(element.ocrpath, ocr_filename);
                      await Tesseract.recognize(pathTo, "eng", {
                        logger: (m) => console.log(m),
                      }).then(async ({ data: { text } }) => {
                        console.log(text);
                        let variable_obj = PARAMS.BOT_VARIABLES.find(
                          (o) => o.name === element.variableName
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
          DataLength: `#${PARAMS.DATA.length}`,
          CurrentDataRow: `${JSON.stringify(PARAMS.LOCALDATA)}`,
          Iteration: `#${PARAMS.IDX}`,
          ProcCount: `#${PARAMS.PROCESSCOUNTER}`,
          ProcSeq_elem: element,
          Error: error,
        };
        PARAMS.ERRSTATUS.push(errorGen);
        console.log(PARAMS.ERRSTATUS);
        let notification = await setNotification(
          PARAMS.BOTS.botName,
          "error",
          ` is facing an issue with #${PARAMS.PROCESSCOUNTER} process in #${PARAMS.IDX} Iteration`,
          "null"
        );
        mainWindow.webContents.send("notification-single", notification);
        // loadingWindow.webContents.send("next-process-state-change");
      }
      if (PARAMS.PROCESSCOUNTER + 1 >= PARAMS.PROCESSLENGTH) {
        PARAMS.PROCESSCOUNTER = 0;
        if (PARAMS.BOTS.filepath) PARAMS.LOCALDATA = PARAMS.DATA.pop();
        PARAMS.IDX++;
      } else {
        PARAMS.PROCESSCOUNTER++;
        if (!autoLoad) {
          loadingWindow.webContents.send("next-process");
        }
      }
    } else {
      let notification = await setNotification(
        PARAMS.BOTS.botName,
        "log",
        " has completed its task",
        "null"
      );
      mainWindow.webContents.send("notification-single", notification);
      mainWindow.setProgressBar(0.0);
      PARAMS.reset_var();
      PARAMS.BOTALREADYOPENED = false;
      loadingWindow.hide();
      loadingWindow.destroy();
      loadingWindow = null;
    }
    mainWindow.setProgressBar(PARAMS.IDX / PARAMS.ITERATION);
  }
}

module.exports = { run_bot, start_bot };
