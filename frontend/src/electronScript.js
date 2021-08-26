// export const electron = window.require("electron");
export const { ipcRenderer } = window.electron;

export const editBotChannel = "edit-bot";
export const addBotChannel = "add-bot";
export const deleteBotChannel = "remove-bot";
export const startBotChannel = "start-bot";
export const SearchLinkChannel = "search-link";
export const ProcessLinkChannel = "process-link";
export const SaveBotChannel = "Save-Bot";
export const MultipleNotificationChannel = "notification-multi";
export const SingleNotificationChannel = "notification-single";
export const ocrEngineChannel = "ocr-engine";
export const exportBot = "export-bot";
export const importBot = "import-bot";
export const ocrEngine = "ocr-engine";
export const getUploadFolderPath = "get-synchronous-upload-folder-path";
export const getDownloadFolderPath = "get-synchronous-download-folder-path";
export const csvGetHeader = "csv-get-header";

export function send(teleport, content) {
  ipcRenderer.send(teleport, content);
}

export function receive(teleport) {
  ipcRenderer.on(teleport, function (e, content) {
    return content;
  });
}
