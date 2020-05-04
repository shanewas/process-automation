const xpath = require("../modules/xpath");
const { ipcSend } = require("./ipcManage");

window.onload = function () {
	const body = document.querySelector("body");
	body.addEventListener("click", (e) => {
		if (e.shiftKey) {
			e.preventDefault();
			var type, placeholder;
			e.path[0].type ? (type = e.path[0].type) : (type = null);
			e.path[0].placeholder
				? (placeholder = e.path[0].placeholder)
				: (placeholder = null);

			let xp = xpath.getXPath(e);
			xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
			let idSeq = {
				tagName: e.path[0].tagName,
				type: type,
				placeholder: placeholder,
				value: e.path[0].innerHTML,
				xpath: xp,
				// parent: e.path,
				// parentLength: e.path.length,
			};
			console.log(idSeq);
			ipcSend("idSeq", idSeq);
		}
	});
};
