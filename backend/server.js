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
	  res.json({"message" : "You must pass ID other than 0"});    
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
		res.json({ "message": "You must pass a valid bot ID " });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
core.use("/api", router);

core.listen(port, () => console.log(`Server started on port ${port}`));
