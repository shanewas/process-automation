const { app } = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const DataStore = require("nedb-promises");

const dbFactory = (fileName) =>
	DataStore.create({
		filename: isDev
			? path.join("./backend/data/", fileName)
			: // : path.join("./backend/data/", fileName), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
			  // : path.join("./backend/data/", fileName).replace('/app.asar', ''), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
			  path.join(app.getAppPath("userData"), "../backend/data/", fileName), // WINDOWS BUILD
		// : path.join(__dirname, "../data/", fileName).replace('/app.asar', ''),
		timestampData: true,
		autoload: true,
	});

const db = {
	botsList: dbFactory("bots.db"),
	processList: dbFactory("process.db"),
	notificationList: dbFactory("notification.db"),
};

// GET BOTS LIST
const listAllBots = async () => {
	const docs = await db.botsList.find({}).exec();
	return docs;
};

// GET SINGLE BOT
const fetchBot = async (botName) => {
	const docs = await db.botsList.findOne({ botName: botName }).exec();
	return docs;
};

// ADD BOT
const addBot = async (botName, botType) => {
	const docs = await db.botsList.findOne({ botName: botName }).exec();
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
		await db.botsList.insert(bot).then((err, doc) => {
			console.log(`${botName} has been Added`);
			return;
		});
	} else {
		console.log(
			`${botName} already exists, change the bot name and try again!`
		);
		return;
	}
};

// REMOVE BOT
const removeBot = async function (botName) {
	await db.botsList.remove({ botName: botName }, {}).then((err, numRemoved) => {
		if (err) console.log(`Unable to remove ${botName}, please try again!`);
		else {
			if (numRemoved > 0) {
				console.log(`Bot: '${botName}' has been removed successfully!`);
			} else console.log("Unable to remove bot, please pass a valid bot name!");
		}
	});
	await db.processList
		.remove({ botName: botName }, {})
		.then((err, numRemoved) => {
			if (err) console.log(`Unable to remove ${botName}, please try again!`);
			else {
				if (numRemoved > 0) {
					console.log(
						`Process List for : '${botName}' has been removed successfully!`
					);
				} else
					console.log("Unable to remove bot, please pass a valid bot name!");
			}
		});
	await db.notificationList
		.remove({ botName: botName }, { multi: true })
		.then((err, numRemoved) => {
			if (err) console.log(`Unable to remove ${botName}, please try again!`);
			else {
				if (numRemoved > 0) {
					console.log(
						`Notification set for: '${botName}' has been removed successfully!`
					);
				} else
					console.log("Unable to remove bot, please pass a valid bot name!");
			}
		});
};

// ADD/EDIT PROCESS
const updateBotProcess = async function (botName, process) {
	const docs = await db.botsList.findOne({ botName: botName }, {}).exec();
	if (docs === null) console.log(`${botName} bot does not exist`);
	else {
		bot = {
			botName: botName,
			processSequence: process,
		};
		const docs = await db.processList.findOne({ botName: botName }, {}).exec();
		if (docs === null) {
			await db.processList.insert(bot).then((err, doc) => {
				console.log(
					`process: ${bot.processSequence} added to ${bot.botName} bot`
				);
			});
		} else {
			await db.processList
				.update(
					{ botName: botName },
					{ $set: { processSequence: bot.processSequence } },
					{}
				)
				.then((err, doc) => {
					console.log(
						`process: ${bot.processSequence} added to ${bot.botName} bot`
					);
				});
		}
	}
};

//update-bot
const editBot = async function (
	botName,
	filepath,
	header,
	status,
	botIteration
) {
	const docs = await db.botsList.findOne({ botName: botName }).exec();
	if (docs === null) {
		console.log(`${botName} not found in DB!`);
	} else {
		await db.botsList
			.update(
				{ botName: botName },
				{
					$set: {
						filepath: filepath,
						status: status,
						header: header,
						botIteration: botIteration,
					},
				},
				{}
			)
			.then((err, numReplaced) => {
				console.log("Bot updated successfully!!");
			});
	}
};

// GET PROCESS SEQUENCE FOR SINGLE BOT
const getProcessSequence = async (botName, res) => {
	const docs = await db.processList.findOne({ botName: botName }).exec();
	if (docs !== null) {
		return docs.processSequence;
	} else return [];
};
// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//

async function GetProcess(botName) {
	const docs = await db.processList.findOne({ botName: botName }).exec();
	if (docs !== null) return docs;
	else return [];
}
async function GetBot(botName) {
	const docs = await db.botsList.findOne({ botName: botName }).exec();
	if (docs !== null) return docs;
	else return [];
}

// getting current time and date in local format
const getCurrentTime = () => {
	let date = moment().format("MMMM Do YYYY");
	let time = moment().format("h:mm:ss a");
	let currentDateTime = date + " at " + time;
	return currentDateTime;
};

const getNotification = async function (notiNumber) {
	const notificationDocs = await db.notificationList
		.find({})
		.sort({ time: -1 })
		.limit(notiNumber)
		.exec();
	return notificationDocs;
};

const setNotification = async function (botName, type, message, action) {
	const docs = await db.botsList.findOne({ botName: botName }, {}).exec();
	if (docs === null) console.log(`No such bot named ${botName} found!!`);
	else {
		let currentDateTime = getCurrentTime();
		let notification = {
			botName: botName,
			type: type,
			message: message,
			action: action,
			time: currentDateTime,
		};
		await db.notificationList.insert(notification).then((err) => {
			console.log(`Notification successfully added ${botName}`);
		});
		return notification;
	}
};

module.exports = {
	addBot,
	editBot,
	fetchBot,
	GetBot,
	getCurrentTime,
	getNotification,
	GetProcess,
	getProcessSequence,
	listAllBots,
	removeBot,
	setNotification,
	updateBotProcess,
};
