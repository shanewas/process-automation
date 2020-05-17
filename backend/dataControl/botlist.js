const { app } = require("electron");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const DataStore = require("nedb-promises");
const csv = require("csv-parser");

const dbFactory = (fileName) =>
	DataStore.create({
		filename: `${
			process.env.NODE_ENV === "dev" ? "." : app.getAppPath("userData")
		}/backend/data/${fileName}`,
		timestampData: true,
		autoload: true,
	});

const db = {
	botsList: dbFactory("bots.db"),
	processList: dbFactory("process.db"),
};

// GET BOTS LIST
const listAllBots = async function () {
	await db.botsList.find({}, function (err, docs) {
		return docs;
	});
};

// GET SINGLE BOT
const fetchBot = async (botName, res) => {
	await db.botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			console.log(
				"The bot you are looking for does not exist, provide a valid bot name and try again!"
			);
			return null;
		} else {
			return docs;
		}
	});
};
const MainFetchBot = async (botName) => {
	await db.botsList.findOne({ botName: botName }, (err, docs) => {
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
const addBot = async function (botName, botType) {
	await db.botsList.findOne({ botName: botName }, async (err, docs) => {
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
			await db.botsList.insert(bot, (err, doc) => {
				return doc;
			});
			console.log(botName + "has been Added");
		} else {
			console.log(
				"a bot with this bot name already exists, change the bot name and try again!"
			);
			return null;
		}
	});
};

// REMOVE BOT
const removeBot = async function (botName, res) {
	await db.botsList.remove({ botName: botName }, (err, doc) => {
		if (err) console.log("Unable to remove bot, please try again!");
		else {
			if (doc > 0) {
				let resMsg = `Bot: '${botName}' has been removed successfully!`;
				return resMsg;
			} else return "Unable to remove bot, please pass a valid bot name!";
		}
	});

	// saveBots(botsToKeep);
};

// Nabil
// ADD/EDIT PROCESS
const editBotProcess = async function (botName, process, res) {
	bot = await db.botsList.findOne({ botName: botName }, async (err, docs) => {
		if (docs === null) return "No such bot exists!";
		else {
			await db.processList.find({ botName: botName }, async (err, docs) => {
				if (docs.length === 0) {
					bot = {
						botName: botName,
						processSequence: process,
					};
					await db.processList.insert(bot, (err, docs) => {
						return docs.processSequence;
					});
				} else {
					await db.processList.findOne(
						{ botName: botName },
						async (err, docs) => {
							prevProcessList = docs.processSequence;
							for (let i = 0; i < process.length; i++)
								prevProcessList.push(process[i]);
							await db.processList.update(
								{ botName: botName },
								{ $set: { processSequence: prevProcessList } },
								(err, numReplaced) => {
									return prevProcessList;
								}
							);
						}
					);
				}
			});
		}
	});
};
// GET PROCESS SEQUENCE FOR SINGLE BOT
const getProcessSequence = async (botName, res) => {
	await db.processList.findOne({ botName: botName }, (err, docs) => {
		if (docs !== null) {
			console.log(docs);
			return docs.processSequence;
		} else return null;
	});
};
// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//

function GetProcess(botName) {
	return new Promise(async (resolve, reject) => {
		await db.processList.findOne({ botName: botName }, function (err, docs) {
			docs !== null ? resolve(docs) : `No process found under ${botName} bot`;
		});
	});
}
function GetBot(botName) {
	return new Promise(async (resolve, reject) => {
		await db.botsList.findOne({ botName: botName }, function (err, docs) {
			docs !== null ? resolve(docs) : `No bot found named ${botName}`;
		});
	});
}

function GetCsv(filepath) {
	return new Promise((resolve, reject) => {
		var x = [];
		fs.createReadStream(filepath, { bufferSize: 64 * 1024 })
			.pipe(csv())
			.on("data", (row) => {
				x.push(row);
			})
			.on("end", () => {
				console.log("CSV file successfully processed");
				resolve(x);
			});
	});
}
// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//

const editBot = async function (
	botName,
	filepath,
	header,
	status,
	botIteration
) {
	console.log("edit bot: " + botName);
	await db.botsList.findOne({ botName: botName }, async (err, docs) => {
		if (docs === null) {
			return "Not found";
			// res.send("Unable to edit bot, no such bot exists!");
		} else {
			await db.botsList.update(
				{ botName: botName },
				{
					$set: {
						filepath: filepath,
						status: status,
						header: header,
						botIteration: botIteration,
					},
				},
				(err, numReplaced) => {
					return "Bot updated successfully!";
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
	addBot: addBot,
	removeBot: removeBot,
	editBot: editBot,
	listAllBots: listAllBots,
	fetchBot: fetchBot,
	MainFetchBot: MainFetchBot,
	getCurrentTime: getCurrentTime,
	editBotProcess: editBotProcess,
	getProcessSequence: getProcessSequence,
};
