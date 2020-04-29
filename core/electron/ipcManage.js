const { ipcRenderer } = require("electron");

function ipcSend(channel, params) {
	ipcRenderer.send(channel, params);
}

function ipcReceive(teleport) {
	ipcRenderer.on(teleport, function (e, content) {
		return content;
	});
}
/** START */
// future optimization with ipcSending
// function _typeSend() {}
// function linkSend(params) {}
/** END */
module.exports = { ipcSend, ipcReceive };
