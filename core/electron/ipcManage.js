const { ipcRenderer } = require("electron");

function ipcSend(channel, params) {
	ipcRenderer.send(channel, params);
}

/** START */
// future optimization with ipcSending
// function _typeSend() {}
// function linkSend(params) {}
/** END */
module.exports = { ipcSend };
