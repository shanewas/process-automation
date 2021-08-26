const { ipcMain } = require("electron");

const { getNotification } = require("../../controller/local/dbScript");

//data COM
ipcMain.handle("notification-multi", async (event, notiNumber) => {
	const result = await getNotification(notiNumber);
	return result;
});
