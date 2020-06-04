export const electron = window.require("electron");
export const {ipcRenderer} = electron;

export const editBotChannel = "edit-bot";
export const addBotChannel = "add-bot";
export const deleteBotChannel = "remove-bot";
export const startBotChannel = "start-bot";
export const SearchLinkChannel = "search-link";
export const ProcessLinkChannel = "process-link";
export const SaveBotChannel = "Save-Bot";


export function send(teleport, content) {
	ipcRenderer.send(teleport, content);
}

export function receive(teleport) {
	ipcRenderer.on(teleport, function (e, content) {
		return content;
	});
}
