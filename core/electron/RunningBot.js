const electron = require("electron");

const { ipcRenderer } = electron;

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
			console.log(xPathRes);
			xPathRes.singleNodeValue.value = package.loadData;
		});
		ipcRenderer.send("need-click");
		ipcRenderer.on("click-it", function (e, package) {
			xPathRes = document.evaluate(
				package.xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			);
			console.log(xPathRes);
			xPathRes.singleNodeValue.click();
			console.log("click");
		});
	}
});
