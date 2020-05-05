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
				botStatus: "disabled",
				lastActive: getCurrentTime(),
			};
			botsList.insert(bot, (err, doc) => {
				res.send(doc);
			});
			console.log(botName + "has been Added");
		} else
			res.send(
				"a bot with this bot name already exists, change the bot name and try again!"
			);
		console.log(
			"a bot with this bot name already exists, change the bot name and try again!"
		);
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
// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//
const RunP1 = (botName, window) => {
	processList.findOne({ botName: botName }, async (err, docs) => {
		if (docs !== null) {
			console.log(
				`Loading: ${botName} of link ${docs.processSequence[0].link}`
			);
			await window.loadURL(docs.processSequence[0].link);
			window.show();
		} else
			console.log(
				"Unable to get the process sequence, give valid bot name and try again!"
			);
	});
};

function GetProcess(botName) {
	return new Promise((resolve, reject) => {
		processList.findOne({ botName: botName }, function (err, docs) {
			docs !== null ? resolve(docs) : `No process found under ${botName} bot`;
		});
	});
}
function GetBot(botName) {
	return new Promise((resolve, reject) => {
		botsList.findOne({ botName: botName }, function (err, docs) {
			docs !== null ? resolve(docs) : `No bot found named ${botName}`;
		});
	});
}

function GetCsv(filepath) {
	var x = [];
	fs.createReadStream(filepath, { bufferSize: 64 * 1024 })
		.pipe(csv())
		.on("data", (row) => {
			x.push(row);
		})
		.on("end", () => {
			console.log("CSV file successfully processed");
		});
	return new Promise((resolve, reject) => {
		resolve(x);
	});
}
// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//

const editBot = function (botName, filepath, header, status, res) {
	console.log("edit bot: " + botName);
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			console.log("Not found");
			res.send("Unable to edit bot, no such bot exists!");
		} else {
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
	GetProcess: GetProcess,
	GetBot: GetBot,
	GetCsv: GetCsv,
	RunP1: RunP1,
	addBot: addBot,
	removeBot: removeBot,
	editBot: editBot,
	listAllBots: listAllBots,
	fetchBot: fetchBot,
	MainFetchBot: MainFetchBot,
	getCurrentTime: getCurrentTime,
	editBotProcess: editBotProcess,
	getProcessSequence: getProcessSequence,
	processList: processList,
};
