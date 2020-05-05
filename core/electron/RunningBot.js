const electron = require("electron");

const { ipcRenderer, remote } = electron;

document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		console.log("loaded");
		ipcRenderer.send("need-form");
		ipcRenderer.on("form-fill-up", function (e, package) {
			xPathRes = document.evaluate(
				package.xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			);
			xPathRes.singleNodeValue.value = package.loadData;
		});
		// remote.ipcMain.removeAllListeners("form-fill-up");
		ipcRenderer.send("need-click");
		ipcRenderer.on("click-it", function (e, package) {
			xPathRes = document.evaluate(
				package.xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			);
			xPathRes.singleNodeValue.click();
		});
		// remote.ipcMain.removeAllListeners("click-it");
	}
});
