const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const core = express();

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
	let rawdata = fs.readFileSync(
		`${path.join(__dirname, "dataControl/botlist.json")}`
	);
	let botlist = JSON.parse(rawdata);

	res.json(botlist);
});

//api - fetching informations of a single bot
router.get("/bots/:id", (req,res) => {
	const botInfo = botlist.fetchBot(req.params.id);
	if (botInfo !== '')
		res.json(botlist.fetchBot(req.params.id));
	else
		res.json({ "message": "You must pass a valid bot ID" });
});

//api - adding a new bot
router.post("/bots/add-bot", (req, res) => {
	let bot = req.body;

	//extracting bot info
	let botName = bot.botName;
	let runTime = bot.runTime;
	let category = bot.category;
	botlist.addBot(botName, runTime, category);
	res.send('New Bot Added!');
});

//api - removing a bot
router.post("/bots/remove-bot", (req, res) => {
	let bot = req.body;
	//extracting bot id 
	let botId = bot.id;
	if (!botId)
		res.send('You must pass a valid bot ID');
	else {
		console.log(botId);
		const bots = botlist.listAllBots();
		let botToRemove = bots.find((bot) => bot.id === parseInt(botId));

		if (!botToRemove)
			res.send('No bot found!');
		else {
			botlist.removeBot(botId);
			res.send('Bot removed Successfully!');
		}
	}
});

//api - edit/updating a bot
router.put("/bots/update-bot/:id", (req, res) => {
	const botInfo = botlist.fetchBot(req.params.id);
	let botUpdate = req.body;
	if (botInfo !== '' && Object.keys(botUpdate).length > 0) {
		let updatedFields = Object.keys(botUpdate);		
		updatedFields.forEach((field) => {
			botInfo[field] = botUpdate[field];
		});
			
		botlist.editBot(botInfo);	
		res.json('Bot updated Successfully!');
	}
	else
		res.json({ "message": "Bot update Failed!" });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
core.use("/api", router);

core.listen(port, () => console.log(`Server started on port ${port}`));
