// const electron = require("electron");
const electron = require("electron");
const { remote } = electron;

// // const botlist = require("../../backend/dataControl/botlist");
// const usability = require("../modules/usability");
// var a = {
// 	botName: "Potato",
// 	process: [
// 		{ _type: "link", link: "https://facebook.com" },
// 		{
// 			tagName: "INPUT",
// 			type: "text",
// 			placeholder: "Search GitHub",
// 			value: "",
// 			xpath:
// 				"BODY/DIV[1]/HEADER[1]/DIV[1]/DIV[2]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/LABEL[1]/INPUT[1]",
// 			_type: "LoadData",
// 		},
// 		{
// 			tagName: "A",
// 			type: null,
// 			placeholder: null,
// 			value: "\n          Sign&nbsp;in\n        ",
// 			xpath: "BODY/DIV[1]/HEADER[1]/DIV[1]/DIV[2]/DIV[2]/A[1]",
// 			_type: "click",
// 		},
// 	],
// 	filepath: null,
// 	headers: [],
// 	status: [],
// };
// let usab = new usability(a.process);
// window.onload = function () {
// 	const body = document.querySelector("body");
// 	// if (a.process[0]._type == "link") {
// 	// 	remote.getCurrentWindow().loadURL(a.process[0].link);
// 	// }
// 	body.addEventListener("click", (e) => {
// 		if (e.shiftKey) {
// 			e.preventDefault();
// 			for (i = 1; i < a.process.length; i++) {
// 				if (a.process[i]._type == "click") {
// 					// usab.click();
// 					console.log(document);
// 				}
// 			}
// 		}
// 	});
// };
function click(path) {
	let xPathRes = document.evaluate(
		this.path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	);
	return xPathRes.singleNodeValue.click();
}

remote.ipcRenderer.send("wtf");
