const electron = require("electron");
const botlist = require("../../backend/dataControl/botlist");

const { ipcRenderer, remote } = electron;
var bots;
var botProcess;
var data;

document.addEventListener("DOMContentLoaded", (event) => {
	ipcRenderer.send("want-bot-name");
	ipcRenderer.on("reply-bot-name", async function (e, botName) {
		await botlist.GetBot(botName).then((docs) => {
			bots = docs;
		});
		await botlist.GetProcess(botName).then((docs) => {
			botProcess = docs;
		});
		botlist
			.GetCsv(bots.filepath)
			.then((dat) => {
				data = dat;
			})
			.then(() => {
				(function runloop(i) {
					setTimeout(async function () {
						for (
							let index = 0;
							index < botProcess.processSequence.length;
							index++
						) {
							let header = botProcess.processSequence[index].dataHeader;
							// console.log(botProcess.processSequence[index]);
							// console.log(data[0].first_name);
							switch (botProcess.processSequence[index]._type) {
								case "LoadData":
									xPathRes = document.evaluate(
										botProcess.processSequence[index].xpath,
										document,
										null,
										XPathResult.FIRST_ORDERED_NODE_TYPE,
										null
									);
									await (xPathRes.singleNodeValue.value = data[i][header]);
									break;
								case "click":
									xPathRes = document.evaluate(
										botProcess.processSequence[index].xpath,
										document,
										null,
										XPathResult.FIRST_ORDERED_NODE_TYPE,
										null
									);
									await xPathRes.singleNodeValue.click();
									break;
								// case "link":
								// 	await window.loadURL(docs.processSequence[element].link);
								// 	break;
								default:
									console.log("_type doesnt match");
							}
						}
						if (++i) runloop(i);
					}, 10);
				})(data.length);
			});
		//dont delete *************//
		// botlist.RunP2(botName, document, remote.getCurrentWindow());
		//dont delete *************//
	});
});
