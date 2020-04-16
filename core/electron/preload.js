const xpath = require("../modules/xpath");
const { ipcRenderer } = require("electron");
const { win, contectWindow } = require("./windowList");

window.onload = function () {
	const body = document.querySelector("body");
	body.addEventListener("click", (e) => {
		if (e.shiftKey) {
			e.preventDefault();
			var type;
			e.path[0].type ? (type = e.path[0].type) : (type = null);
			let idSeq = {
				type: type,
				tagName: e.path[0].tagName,
				value: e.path[0].innerHTML,
				xpath: `${xpath.getXPath(e)}`,
			};
			console.log(idSeq);
			const xp = xpath.getXPath(e);
			ipcRenderer.send("xpath", idSeq);
		}
	});
};
