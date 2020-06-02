const xpath = require("../modules/xpath");
const { ipcSend } = require("./ipcManage");

document.addEventListener("click", (e) => {
	if (e.shiftKey) {
		e.preventDefault();
		var type, placeholder, label;
		e.path[0].type ? (type = e.path[0].type) : (type = null);
		e.path[0].placeholder
			? (placeholder = e.path[0].placeholder)
			: (placeholder = null);

		try {
			label = e.path[0].labels[0].innerText;
		} catch (error) {
			label = undefined;
		}

		let xp = xpath.getXPath(e);
		xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
		let idSeq = {
			tagName: e.path[0].tagName,
			type: type,
			placeholder: placeholder,
			value: e.path[0].innerHTML,
			xpath: xp,
			ext: {
				label: label,
			},
			// parent: e.path,
			// parentLength: e.path.length,
		};
		console.log(idSeq);
		ipcSend("idSeq", idSeq);
	}
});
