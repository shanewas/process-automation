const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const core = express();
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

router.get("/bots", (req, res) => {
	let rawdata = fs.readFileSync(
		`${path.join(__dirname, "dataControl/botlist.json")}`
	);
	let botlist = JSON.parse(rawdata);

	res.json(botlist);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
core.use("/api", router);

core.listen(port, () => console.log(`Server started on port ${port}`));
