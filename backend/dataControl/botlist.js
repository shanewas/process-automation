const fs = require("fs");
const path = require("path");
const moment = require('moment');

// Add Bot Function
const addBot = function (botName, runTime, category) {
	// fetching stored bots from json file
	const bots = loadBots();
	const currentDateTime = getCurrentTime();
	const id = bots.length + 1;
	console.log('Successfully added bot number: '+id);
   
	bots.push({
		id: id,
		botName: botName,
		runTime: runTime,
		category: category,
		status: 'disabled',
		lastActive: currentDateTime
	});

	saveBots(bots);
};

// Delete Bot Function
const removeBot = function (botName) {
	const bots = loadBots();
	const botsToKeep = bots.filter(function (bot) {
		return bot.botName != botName;
	});

	saveBots(botsToKeep);
}

// Edit Bot Function
const editBot = function (botName, runTime, category) {
	const bots = loadBots();
	bots.forEach(function (bot) { 
		if (bot.botName === botName) {
			bot.botName = botName;
			bot.runTime = runTime;
			bot.category = category;
		}
	});

	saveBots(bots);
}

// List all Bots Function
const listAllBots = function () {
	const bots = loadBots();
	bots.forEach(function (bot) {
		console.log(bot.botName);
	});
}

const fetchBot = (id) => {
	const bots = loadBots();
	if (id <= bots.length) {
		const botToFetch = bots.find((bot) => bot.id === Number(id));
		return botToFetch;
	} else
		return botToFetch = '';
}

// Fetch BotList Function
const loadBots = function () {
	try {
		const dataBuffer = fs.readFileSync(`${path.join(__dirname, "botlist.json")}`);
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch {
		return [];
	}
};

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
	fetchBot: fetchBot
};

// addBot("mandarin", 1, "filler");
// console.log(fetchBot('carrot'));

// removeBot('banana');
// console.log(loadBots());
// listAllBots();
// editBot('tomato',2,'filler');