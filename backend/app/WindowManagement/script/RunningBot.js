window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
document.addEventListener("DOMNodeInserted", function (event) {
  if (!!window && !!!window.$) {
    window.$ = window.jQuery = require("jquery");
  }
});

const electron = require("electron");

const { ipcRenderer } = electron;
function processRunner(event) {
  ipcRenderer.send("need-process");
}
ipcRenderer.on("next-process", function (e) {
  processRunner(e);
});
ipcRenderer.on("next-process-state-change", function (e) {
  if (document.readyState === "complete") {
    processRunner(e);
  }
});
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    processRunner(event);
  }
});
