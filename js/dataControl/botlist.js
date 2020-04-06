const fs = require('fs');

// Add Bot Function
const addBot = function (botName, runTime, category) {
    // fetching stored bots from json file
    const bots = loadBots();

    bots.push({
        "botName": botName,
        "runTime": runTime,
        "category":category
    });

    saveBots(bots);
};

// Fetch BotList Function
const loadBots = function () {
    try {
        const dataBuffer = fs.readFileSync('botlist.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch { 
        return [];
    }
};

// Store BotList Function
const saveBots = function (bots) {
    const dataJSON = JSON.stringify(bots);
    fs.writeFileSync('botlist.json', dataJSON);
}

module.exports = {
    addBot: addBot
};
