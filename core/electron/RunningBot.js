const electron = require("electron");

const { ipcRenderer, remote } = electron;
async function processRunner(event) {
	ipcRenderer.send("need-process");
}
ipcRenderer.on("form-fill-up", async function (e, package) {
	xPathRes = document.evaluate(
		package.path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	);
	xPathRes.singleNodeValue.value = package.dat;
	processRunner(event);
});
ipcRenderer.on("click-it", async function (e, path) {
	xPathRes = document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	);
	xPathRes.singleNodeValue.click();
	if (document.readyState !== "complete") {
		processRunner(event);
	}
});
document.addEventListener("readystatechange", async (event) => {
	if (event.target.readyState === "complete") {
		await processRunner(event);
	}
});
