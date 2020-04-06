const express = require("express");
const path = require("path");

const core = express();

const fs = require("fs");

core.get("/api/bots", (req, res) => {
	let rawdata = fs.readFileSync(
		`${path.join(__dirname, "dataControl/botlist.json")}`
	);
	let botlist = JSON.parse(rawdata);

	res.json(botlist);
});

const port = 9000;

core.listen(port, () => console.log(`Server started on port ${port}`));
