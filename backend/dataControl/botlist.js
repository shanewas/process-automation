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
			: path.join(app.getAppPath("userData"), "../backend/data/", fileName),
		timestampData: true,
		autoload: true,
	});

const db = {
	botsList: dbFactory("bots.db"),
	processList: dbFactory("process.db"),
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
};

// change this??
// ADD/EDIT PROCESS
const updateBotProcess = async function (botName, process) {
	// const docs = await db.botsList.findOne({ botName: botName }).exec();
	// if (docs === null) console.log(`${botName} doesn't exists!`);
	// else {
	// 	const docs = await db.processList.find({ botName: botName }).exec();
	// 	if (docs.length === 0) {
	// 		bot = {
	// 			botName: botName,
	// 			processSequence: process,
	// 		};
	// 		await db.processList.insert(bot).then((err, docs) => {
	// 			console.log(`${botName} Added!`);
	// 		});
	// 	} else {
	// 		await db.processList.findOne({ botName: botName }).exec();
	// 		let prevProcessList = docs.processSequence;
	// 		for (let i = 0; i < process.length; i++) prevProcessList.push(process[i]);
	// 		await db.processList
	// 			.update(
	// 				{ botName: botName },
	// 				{ $set: { processSequence: prevProcessList } },
	// 				{}
	// 			)
	// 			.then((err, numberReplaced) => {
	// 				console.log(`${botName} Updated!`);
	// 			});
	// 	}
	// }
	
	const docs = await db.botsList.findOne({botName: botName},{}).exec();
	if(docs === null)
		console.log(`${botName} bot does not exist`);
		else{
			bot = {
				botName: botName,
				processSequence: process
			}
			const docs = await db.processList.findOne({botName : botName},{}).exec();
			if(docs === null){
				await db.processList.insert(bot).then((err,doc)=>{
					console.log(`process: ${bot.processSequence} added to ${bot.botName} bot`);
				});
			}else{
				await db.processList
				.update({botName: botName},{$set: {processSequence: bot.processSequence}}, {})
				.then((err,doc)=>{
					console.log(`process: ${bot.processSequence} added to ${bot.botName} bot`);
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

// ****************************************NO CHANGE MAIN RUN BOT PROCESS*********************************************************************//

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
	addBot,
	editBot,
	fetchBot,
	GetBot,
	getCurrentTime,
	GetProcess,
	getProcessSequence,
	listAllBots,
	removeBot,
	updateBotProcess,
};
