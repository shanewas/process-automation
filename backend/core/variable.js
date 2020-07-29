let browser;
let LINKALREADYOPENED = false;
let BOTALREADYOPENED = false;
var BOTS;
var BOTPROCESS;
var DATA = [];
var ITERATION = 1;
var BOT_VARIABLES = [];
var PROCESSLENGTH = 0;
var PROCESSCOUNTER = 0;
var LOCALDATA;
var IDX;
var ERRSTATUS = [];
var RUNINGSTATUS = false;

function reset_var() {
	BOTS = null;
	BOTPROCESS = null;
	DATA = [];
	ITERATION = 1;
	BOT_VARIABLES = [];
	PROCESSLENGTH = 0;
	PROCESSCOUNTER = 0;
	LOCALDATA = null;
	IDX = 0;
	ERRSTATUS = [];
	RUNINGSTATUS = false;
}

module.exports = { reset_var };
