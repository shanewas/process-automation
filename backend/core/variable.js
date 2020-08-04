let LINKALREADYOPENED = false;
let BOTALREADYOPENED = false;
let BOTS;
let BOTPROCESS;
let DATA = [];
let ITERATION = 1;
let BOT_VARIABLES = [];
let PROCESSLENGTH = 0;
let PROCESSCOUNTER = 0;
let LOCALDATA;
let IDX;
let ERRSTATUS = [];
let RUNINGSTATUS = false;

function reset_var() {
	// LINKALREADYOPENED = false;
	// BOTALREADYOPENED = false;
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

module.exports = { LINKALREADYOPENED, reset_var };
