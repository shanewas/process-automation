const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const core = express();

const DataStore = require('nedb');
let botsList = new DataStore({ filename: `${path.join(__dirname, "../data/bots.db")}`, autoload: true });

//import botlist.js from backend/dataControl
const botlist = require('./dataControl/botlist.js');

// this will let us get the data from a POST
var bodyParser = require("body-parser");

const port = process.env.PORT || 9000;

core.use(bodyParser.urlencoded({ extended: true }));
core.use(bodyParser.json());
core.use(cors());

var router = express.Router();
// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log(`request ${req} response ${res}`);
	next();
});

// This middle-ware will get the id param
// check if its 0 else go to next router.
router.use("/bots/:id", (req,res,next) => {
	if(req.params.id < 1) {
	  res.json({"message" : "You must pass a valid bot ID"});    
	}
	else next();
});

router.get("/bots", (req, res) => {
	botlist.listAllBots(res);	
});

//api - fetching informations of a single bot
router.get("/bots/:name", (req,res) => {
	botlist.fetchBot(req.params.name, res);	
});

//api - adding a new bot
router.post("/bots/add-bot", (req, res) => {
	let bot = req.body;
	if ('botName' in bot && 'botType' in bot) {
		let botName = bot.botName;
		let botType = bot.botType;
		botlist.addBot(botName, botType, res);
	}
	else {
		res.send('Unable to add new bot, you must provide all 5 of these informations - bot name, process, filepath, header, status!!');
	}
});

//api - removing a bot
router.post("/bots/remove-bot", (req, res) => {
	let bot = req.body;
	//extracting bot id 
	let botName = bot.name;
	if (!botName)
		res.send('You must pass a valid bot name');
	else {		
		botlist.removeBot(botName,res);		
	}
});

//api - edit/updating a bot
router.put("/bots/update-bot/:name", (req, res) => {
	if (req.params.name === null)
		res.send('Unable to edit bot, please provide a bot name!');
	else {
		if (req.body.length === 0)
			res.send('Request failed, you must provie all 3 of these: "filepath", "header" and "status"');
		else {
			let bot = req.body.saveBotObject;
			botlist.editBot(req.params.name, bot.filepath, bot.header, bot.status, res);
		}
	}
});

//api - bot process sequence update
router.put("/bots/update-bot-process/:name", (req, res) => {
	const botProcess = req.body.process;
	botlist.editBotProcess(req.params.name, botProcess, res);	
});

//api - get process sequence for single bot
router.get("/bots/get-process/:name", (req, res) => {
	botlist.getProcessSequence(req.params.name, res);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
core.use("/api", router);

core.listen(port, () => console.log(`Server started on port ${port}`));
