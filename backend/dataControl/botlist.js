const fs = require("fs");
const path = require("path");

// Add Bot Function
const addBot = function (botName, runTime, category) {
	// fetching stored bots from json file
	const bots = loadBots();

	bots.push({
		botName: botName,
		runTime: runTime,
		category: category,
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

module.exports = {
	addBot: addBot,
	removeBot: removeBot,
	editBot: editBot,
	listAllBots:listAllBots
};

// addBot("carrot", 1, "filler");
console.log("asdadsf");

// removeBot('banana');
// console.log(loadBots());
// listAllBots();
// editBot('tomato',2,'filler');