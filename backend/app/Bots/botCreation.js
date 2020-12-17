const { ipcMain } = require("electron");
const { createWindow } = require("../WindowManagement/window");

let contectWindow = null;

function bot_create(mainWindow, LINKALREADYOPENED) {
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
      contectWindow = createWindow(procSeq.link, mainWindow, false, true, true);
    } else {
      contectWindow.destroy();
      contectWindow = createWindow(procSeq.link, mainWindow, false, true, true);
    }
    contectWindow.setResizable(false);
    contectWindow.openDevTools();
    contectWindow.on("close", (e) => {
      LINKALREADYOPENED = false;
      e.preventDefault();
      contectWindow.hide();
      contectWindow.destroy();
    });
    contectWindow.webContents.on("dom-ready", function (e) {
      contectWindow.webContents.on(
        "new-window",
        (
          event,
          url,
          frameName,
          disposition,
          options,
          additionalFeatures,
          referrer,
          postBody
        ) => {
          event.preventDefault();
          // const win = new BrowserWindow({
          //   webContents: options.webContents, // use existing webContents if provided
          //   show: false,
          // });
          // win.once("ready-to-show", () => win.show());
          if (!options.webContents) {
            const loadOptions = {
              httpReferrer: referrer,
            };
            if (postBody != null) {
              const { data, contentType, boundary } = postBody;
              console.log(postBody);
              loadOptions.postData = postBody.data;
              loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`;
            }

            contectWindow.loadURL(url, loadOptions); // existing webContents will be navigated automatically
          }
          event.newGuest = contectWindow;
        }
      );
      contectWindow.maximize();
      contectWindow.show();
    });
    mainWindow.webContents.send("process-link", procSeq);
  });
}
module.exports = { bot_create };
