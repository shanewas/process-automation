const xpath = require("../modules/xpath");
const { ipcSend } = require("./ipcManage");

window.onload = function () {
	var css = document.createElement("style");
	css.type = "text/css";

	// var styles = `
	// 	.highlight { 	background-color: #3FE0D0;
	// 					// border-style: solid;
	// 					border-color: coral;
	// 				}`;

	// if (css.styleSheet) css.styleSheet.cssText = styles;
	// else css.appendChild(document.createTextNode(styles));

	// document.getElementsByTagName("head")[0].appendChild(css);
	// (function () {
	// 	var prev;

	// 	if (document.body.addEventListener) {
	// 		document.body.addEventListener("mouseover", handler, false);
	// 	} else if (document.body.attachEvent) {
	// 		document.body.attachEvent("mouseover", function (e) {
	// 			return handler(e || window.event);
	// 		});
	// 	} else {
	// 		document.body.onmouseover = handler;
	// 	}

	// 	function handler(event) {
	// 		if (event.target === document.body || (prev && prev === event.target)) {
	// 			return;
	// 		}
	// 		if (prev) {
	// 			prev.className = prev.className.replace(/\bhighlight\b/, "");
	// 			prev = undefined;
	// 		}
	// 		if (event.target) {
	// 			prev = event.target;
	// 			prev.className += " highlight";
	// 		}
	// 	}
	// })();

	const body = document.querySelector("body");
	body.addEventListener("click", (e) => {
		if (e.shiftKey) {
			e.preventDefault();
			var type, placeholder, label;
			e.path[0].type ? (type = e.path[0].type) : (type = undefined);
			e.path[0].placeholder
				? (placeholder = e.path[0].placeholder)
				: (placeholder = undefined);

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
	body.addEventListener("keypress", (e) => {
		if (e.shiftKey && e.key) {
			e.preventDefault();
			var type, placeholder, label;
			e.path[0].type ? (type = e.path[0].type) : (type = undefined);
			e.path[0].placeholder
				? (placeholder = e.path[0].placeholder)
				: (placeholder = undefined);

			try {
				label = e.path[0].labels[0].innerText;
			} catch (error) {
				label = undefined;
			}
			let xp = xpath.getXPath(e);
			xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
			let idSeq = {
				tagName: `KeyPress`,
				type: type,
				placeholder: `Pressed "${e.key}"`,
				value: e.key,
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
};
