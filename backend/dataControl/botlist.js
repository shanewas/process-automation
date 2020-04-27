const fs = require("fs");
const path = require("path");
const moment = require('moment');
const DataStore = require('nedb');
const async = require('async');

let botsList = new DataStore({ filename: `${path.join(__dirname, "../data/bots.db")}`, autoload: true });
let processList = new DataStore({ filename: `${path.join(__dirname, "../data/process.db")}`, autoload: true });

// GET BOTS LIST
const listAllBots = function (res) {
	let bots = null;
	botsList.find({ }, function (err, docs) {
		res.send(docs);
	});
}

// GET SINGLE BOT
const fetchBot = (botName, res) => {
	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null)
			res.send('The bot you are looking for does not exist, provide a valid bot name and try again!');
		else
			res.send(docs);
	});
}

// ADD BOT
const addBot = function (botName, botType, res) {

	botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null) {
			const currentDateTime = getCurrentTime();
			// inserting new bot in db
			let bot = {
				// id: id,
				botName: botName,
				botType: botType
			}
			botsList.insert(bot, (err, doc) => {
				res.send(doc);
			});
		} else
			res.send('a bot with this bot name already exists, change the bot name and try again!');			
	});	
};

// REMOVE BOT
const removeBot = function (botName,res) {
	botsList.remove({ botName: botName }, (err, doc) => {
		if (err)
			res.send('Unable to remove bot, please try again!');
		else {
			if (doc > 0) {				
				let resMsg = `Bot: '${botName}' has been removed successfully!`;
				res.send(resMsg);
			} else 
				res.send('Unable to remove bot, please pass a valid bot name!');			
		}		
	});

	// saveBots(botsToKeep);
}

// ADD/EDIT PROCESS
const editBotProcess = function (botName, process, res) {
	bot = botsList.findOne({ botName: botName }, (err, docs) => {
		if (docs === null)
			res.send('No such bot exists!');
		else {
			processList.find({ botName: botName }, (err, docs) => {
				console.log(docs.length);
				if (docs.length === 0) {		
					bot = {
						botName: botName,
						processSequence: process
					};
					processList.insert((bot), (err, docs) => {
						res.send(docs.processSequence);
					});			
				} else {
					processList.findOne({ botName: botName }, (err, docs) => {
						prevProcessList = docs.processSequence;
						// console.log(prevProcessList);
						prevProcessList.push(botProcess);
						console.log(prevProcessList);
						processList.update({ botName: name }, { $set: { processSequence: prevProcessList } }, (err, numReplaced) => {
							res.send(prevProcessList);
						});
					});			
				}
			});
		}
	});
}

// GET PROCESS SEQUENCE FOR SINGLE BOT
const getProcessSequence = (botName,res) => {
	processList.findOne({ botName: botName }, (err, docs) => {
		if (docs !== null) {
			console.log(docs);
			res.send(docs.processSequence);
		} else
			res.send('Unable to get the process sequence, give valid bot name and try again!')
	});
};

// Edit Bot Function
const editBot = function (botInfo) {
	const bots = loadBots();

	console.log('bot id in edit ='+botInfo.id);
	bots.forEach(function (bot) { 
		if (bot.id === botInfo.id) {
			// bot.botName = botInfo.botName;
			// bot.runTime = botInfo.runTime;
			// bot.category = botInfo.category;
			// bot.status = botInfo.status;
			let updatedField = Object.keys(botInfo);
			console.log('updated fields = ' + updatedField);
			updatedField.forEach((field) => {
				bot[field] = botInfo[field];					
			});
		}
	});

	saveBots(bots);
}



// Store BotList Function
const saveBots = function (bots) {
	const dataJSON = JSON.stringify(bots);
	fs.writeFileSync(`${path.join(__dirname, "botlist.json")}`, dataJSON);
};

// getting current time and date in local format
const getCurrentTime = () => {
	let date = moment().format('MMMM Do YYYY');
	let time = moment().format('h:mm:ss a');
	let currentDateTime = date + " at " + time;
	return currentDateTime;
}

module.exports = {
	addBot: addBot,
	removeBot: removeBot,
	editBot: editBot,
	listAllBots: listAllBots,
	fetchBot: fetchBot,
	getCurrentTime: getCurrentTime,
	editBotProcess: editBotProcess, 
	getProcessSequence:getProcessSequence
};
