const fs = require("fs");
const path = require("path");
const moment = require("moment");
const DataStore = require("nedb");
const csv = require("csv-parser");

let botsList = new DataStore({
	filename: `${path.join(__dirname, "../data/bots.db")}`,
	autoload: true,
});
let processList = new DataStore({
	filename: `${path.join(__dirname, "../data/process.db")}`,
	autoload: true,
});

// GET BOTS LIST
const listAllBots = function (res) {
	let bots = null;
	botsList.find({}, function (err, docs) {
		res.send(docs);
	});
};

// GET SINGLE BOT
const fetchBot = (botName, res) => {
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			res.send(
				"The bot you are looking for does not exist, provide a valid bot name and try again!"
			);
			return false;
		} else {
			res.send(docs);
			return true;
		}
	});
};
const MainFetchBot = (botName) => {
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			// res.send('The bot you are looking for does not exist, provide a valid bot name and try again!');
			return false;
		} else {
			// res.send(docs);
			return docs;
		}
	});
};

// Nabil
// ADD BOT
const addBot = function (botName, botType, res) {
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			const currentDateTime = getCurrentTime();
			// inserting new bot in db
			let bot = {
				// id: id,
				botName: botName,
				botType: botType,
			};
			botsList.insert(bot, (err, doc) => {
				res.send(doc);
			});
			console.log(botName+ "has been Added");

		} else
			res.send(
				"a bot with this bot name already exists, change the bot name and try again!"
			);
			console.log("a bot with this bot name already exists, change the bot name and try again!");
	});
};

// REMOVE BOT
const removeBot = function (botName, res) {
	botsList.remove({ botName: botName }, (err, doc) => {
		if (err) res.send("Unable to remove bot, please try again!");
		else {
			if (doc > 0) {
				let resMsg = `Bot: '${botName}' has been removed successfully!`;
				res.send(resMsg);
			} else res.send("Unable to remove bot, please pass a valid bot name!");
		}
	});

	// saveBots(botsToKeep);
};

// Nabil
// ADD/EDIT PROCESS
const editBotProcess = function (botName, process, res) {
	bot = botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) res.send("No such bot exists!");
		else {
			processList.find({ botName: botName }, (err, docs) => {
				if (docs.length === 0) {
					bot = {
						botName: botName,
						processSequence: process,
					};
					processList.insert(bot, (err, docs) => {
						res.send(docs.processSequence);
					});
				} else {
					processList.findOne({ botName: botName }, (err, docs) => {
						prevProcessList = docs.processSequence;
						for (let i = 0; i < process.length; i++)
							prevProcessList.push(process[i]);
						processList.update(
							{ botName: botName },
							{ $set: { processSequence: prevProcessList } },
							(err, numReplaced) => {
								res.send(prevProcessList);
							}
						);
					});
				}
			});
		}
	});
};
// GET PROCESS SEQUENCE FOR SINGLE BOT
const getProcessSequence = (botName, res) => {
	processList.findOne({ botName: botName }, (err, docs) => {
		if (docs !== null) {
			console.log(docs);
			res.send(docs.processSequence);
		} else
			res.send(
				"Unable to get the process sequence, give valid bot name and try again!"
			);
	});
};
// FORM MAIN
const RunP1 = (botName, window) => {
	processList.findOne({ botName: botName }, (err, docs) => {
		if (docs !== null) {
			console.log(
				`Loading: ${botName} of link ${docs.processSequence[0].link}`
			);
			window.loadURL(docs.processSequence[0].link);
		} else
			console.log(
				"Unable to get the process sequence, give valid bot name and try again!"
			);
	});
};

// ******************************************************MAIN END **********************************************************************
// FROM MAIN ---------------------------------------------------------------------------------------------------------- // dont change
const RunP2 = (botName, document, window) => {
	var i = 1;
	var j = 0;
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			return "File path missing";
		} else {
			// console.log(`${i++} : ${j++} : File path : ${docs.filepath}`);
			fs.createReadStream(docs.filepath, { bufferSize: 64 * 1024 })
				.pipe(csv())
				.on("data", (row) => {
					console.log(`data count ${i++}`);
					let xPathRes = null;
					processList.findOne({ botName: botName }, async (err, docs) => {
						if (docs !== null) {
							window.show();
							for (
								let element = 1;
								element < docs.processSequence.length;
								element++
							) {
								switch (docs.processSequence[element]._type) {
									case "LoadData":
										xPathRes = document.evaluate(
											docs.processSequence[element].xpath,
											document,
											null,
											XPathResult.FIRST_ORDERED_NODE_TYPE,
											null
										);
										await (xPathRes.singleNodeValue.value = row.first_name);
										break;
									case "click":
										xPathRes = document.evaluate(
											docs.processSequence[element].xpath,
											document,
											null,
											XPathResult.FIRST_ORDERED_NODE_TYPE,
											null
										);
										if (element.type == "submit") {
											console.log("url opened");
											// let currentURL = window.webContents.getURL();
											await xPathRes.singleNodeValue.click();
											// await window.loadURL(currentURL);
										} else await xPathRes.singleNodeValue.click();
										break;
									case "link":
										await window.loadURL(docs.processSequence[element].link);
										break;
									default:
										console.log("_type doesnt match");
								}
							}
						} else
							console.log(
								"Unable to get the process sequence, give valid bot name and try again!"
							);
					});
				})
				.on("end", () => {
					console.log("CSV file successfully processed");
				});
		}
	});
};

// FROM MAIN ---------------------------------------------------------------------------------------------------------- // dont change
const editBot = function (botName, filepath, header, status, res) {
	console.log("edit bot: " + botName);
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			console.log("Not found")
			res.send("Unable to edit bot, no such bot exists!");
		}
		else {
			botsList.update(
				{ botName: botName },
				{ $set: { filepath: filepath, status: status, header: header } },
				(err, numReplaced) => {
					res.send("Bot updated successfully!");
				}
			);
		}
	});
};
// FROM MAIN ---------------------------------------------------------------------------------------------------------- // dont change
const MainEditBot = function (botName, filepath, header, status) {
	console.log("edit bot: " + botName);
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) console.log("Unable to edit bot, no such bot exists!");
		else {
			botsList.update(
				{ botName: botName },
				{ $set: { filepath: filepath, status: status, header: header } },
				(err, numReplaced) => {
					// console.log(numReplaced);
					// res.send('Bot updated successfully!');
				}
			);
		}
	});
};
// FROM MAIN ---------------------------------------------------------------------------------------------------------- // dont change
const MainEditBotProcess = function (botName, process) {
	bot = botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) console.log("No such bot exists!");
		else {
			processList.find({ botName: botName }, (err, docs) => {
				console.log(docs.length);
				if (docs.length === 0) {
					bot = {
						botName: botName,
						processSequence: process,
					};
					processList.insert(bot, (err, docs) => {
						// res.send(docs.processSequence);
					});
				} else {
					processList.findOne({ botName: botName }, (err, docs) => {
						prevProcessList = docs.processSequence;
						// console.log(prevProcessList);
						for (let i = 0; i < process.length; i++)
							prevProcessList.push(process[i]);
						console.log(prevProcessList);
						processList.update(
							{ botName: botName },
							{ $set: { processSequence: prevProcessList } },
							(err, numReplaced) => {
								// res.send(prevProcessList);
							}
						);
					});
				}
			});
		}
	});
};
// ******************************************************MAIN END **********************************************************************

// Store BotList Function
const saveBots = function (bots) {
	const dataJSON = JSON.stringify(bots);
	fs.writeFileSync(`${path.join(__dirname, "botlist.json")}`, dataJSON);
};

// getting current time and date in local format
const getCurrentTime = () => {
	let date = moment().format("MMMM Do YYYY");
	let time = moment().format("h:mm:ss a");
	let currentDateTime = date + " at " + time;
	return currentDateTime;
};

module.exports = {
	RunP1: RunP1,
	RunP2: RunP2,
	addBot: addBot,
	removeBot: removeBot,
	editBot: editBot,
	MainEditBot: MainEditBot,
	MainEditBotProcess: MainEditBotProcess,
	listAllBots: listAllBots,
	fetchBot: fetchBot,
	MainFetchBot: MainFetchBot,
	getCurrentTime: getCurrentTime,
	editBotProcess: editBotProcess,
	getProcessSequence: getProcessSequence,
	processList: processList,
};
