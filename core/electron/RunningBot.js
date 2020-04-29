// const electron = require("electron");
const electron = require("electron");
const botlist = require("../../backend/dataControl/botlist");
const usability = require("../modules/usability");

const { remote, ipcRenderer } = electron;

console.log("HJi");
let a = {
	process: [
		{ _type: "link", link: "https://facebook.com" },
		{
			placeholder: null,
			tagName: "INPUT",
			type: "email",
			value: "",
			xpath: '//*[@id="email"]',
			_type: "LoadData",
			dataHeader: "first_name",
			dataHeaderindex: 0,
		},
		{
			placeholder: null,
			tagName: "INPUT",
			type: "password",
			value: "",
			xpath: '//*[@id="pass"]',
			_type: "LoadData",
			dataHeader: "last_name",
			dataHeaderindex: 1,
		},
		{
			placeholder: null,
			tagName: "INPUT",
			type: "submit",
			value: "",
			xpath: '//*[@id="u_0_b"]',
			_type: "click",
		},
	],
};
// ipcRenderer.on("run-bot-trigger", function (e, process) {
// 	console.log(process);
// });
// console.log(`${botlist.getProcessSequence("Potato")} weorkingaihsidas`);
// remote.getCurrentWindow().loadURL("https://twitter.com");
// let usab = new usability(a.process);

// window.onload = function () {
document.addEventListener("DOMContentLoaded", (event) => {
	if (ipcRenderer.sendSync("run") == "run-bot") {
		for (i = 1; i < a.process.length; i++) {
			console.log(`count down : ${i}`);
			switch (a.process[i]._type) {
				case "click":
					usability.click(a.process[i].xpath);
					console.log(a.process[i]._type);
					break;
				// case "link":
				// 	usability.form(a.process[i].xpath, "potato");
				// 	console.log(a.process[i]._type);
				// 	break;
				case "LoadData":
					usability.form(a.process[i].xpath, "potato");
					console.log(a.process[i]._type);
					break;
				default:
					console.log("_type doesnt match");
			}
		}
	} else {
		console.log("cant run");
	}
});
// };
