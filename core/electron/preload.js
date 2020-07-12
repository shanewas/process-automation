const xpath = require("../modules/xpath");
const { app, ipcRenderer } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const showToast = require("show-toast");

document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		var style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = "#div { border: 1px dotted #000; position: absolute;}";
		document.getElementsByTagName("head")[0].appendChild(style);
		document.body.innerHTML += '<div id="div" hidden></div>';
	}
});
let Xaxis, Yaxis;
let width, height;

document.addEventListener("click", (e) => {
	if (e.shiftKey) {
		e.preventDefault();
		var type, placeholder, label;
		e.path[0].type ? (type = e.path[0].type) : (type = undefined);
		e.path[0].placeholder
			? (placeholder = e.path[0].placeholder)
			: (placeholder = undefined);

		try {
			label = e.path[0].labels[0].innerText;
		} catch (error) {
			label = undefined;
		}

		let xp = xpath.getXPath(e);
		xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
		let idSeq = {
			tagName: e.path[0].tagName,
			type: type,
			placeholder: placeholder,
			value: e.path[0].innerHTML,
			xpath: xp,
			ext: {
				label: label,
			},
			// parent: e.path,
			// parentLength: e.path.length,
		};
		console.log(idSeq);
		showToast({
			str: "Click action has been recorded",
			time: 1000,
			position: "bottom",
		});
		ipcRenderer.send("idSeq", idSeq);
	}
});

document.addEventListener("keypress", (e) => {
	if (e.shiftKey && e.key === "Y") {
		e.preventDefault();
	} else if (e.shiftKey && e.key === "T") {
		e.preventDefault();
		var type, placeholder, label;
		e.path[0].type ? (type = e.path[0].type) : (type = undefined);
		e.path[0].placeholder
			? (placeholder = e.path[0].placeholder)
			: (placeholder = undefined);

		try {
			label = e.path[0].labels[0].innerText;
		} catch (error) {
			label = undefined;
		}
		let xp = xpath.getXPath(e);
		xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
		let idSeq = {
			tagName: `ScreenShot`,
			type: type,
			placeholder: `Taking ScreenShot`,
			value: e.key,
			xpath: xp,
			ext: {
				label: label,
			},
			param: {
				Xaxis: Xaxis,
				Yaxis: Yaxis,
				width: width,
				height: height,
			},
			ocr: false,
			ocrpath: isDev
				? path.join("./backend/data/ocrOutput/")
				: // : path.join("./backend/data/screenshot/", fileName), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  // : path.join("./backend/data/screenshot/", fileName).replace('/app.asar', ''), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  path.join(app.getAppPath("userData"), "../backend/data/ocr/"), // WINDOWS BUILD
			// : path.join(__dirname, "../data/screenshot", fileName).replace('/app.asar', ''),
			imgpath: isDev
				? path.join("./backend/data/screenshot/")
				: // : path.join("./backend/data/screenshot/", fileName), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  // : path.join("./backend/data/screenshot/", fileName).replace('/app.asar', ''), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  path.join(app.getAppPath("userData"), "../backend/data/screenshot/"), // WINDOWS BUILD
			// : path.join(__dirname, "../data/screenshot", fileName).replace('/app.asar', ''),
		};
		showToast({
			str: "Select the area",
			time: 1500,
			position: "bottom",
		});
		var div = document.getElementById("div"),
			x1 = 0,
			y1 = 0,
			x2 = 0,
			y2 = 0;
		function reCalc() {
			var x3 = Math.min(x1, x2);
			var x4 = Math.max(x1, x2);
			var y3 = Math.min(y1, y2);
			var y4 = Math.max(y1, y2);
			div.style.left = x3 + "px";
			div.style.top = y3 + "px";
			div.style.width = x4 - x3 + "px";
			div.style.height = y4 - y3 + "px";
		}
		onmousedown = function (e) {
			e.preventDefault();
			div.hidden = 0;
			x1 = e.pageX;
			y1 = e.pageY;
			idSeq.param.Xaxis = e.pageX;
			idSeq.param.Yaxis = e.pageY;
			reCalc();
		};
		onmousemove = function (e) {
			e.preventDefault();
			x2 = e.pageX;
			y2 = e.pageY;
			reCalc();
		};
		onmouseup = function (e) {
			e.preventDefault();
			idSeq.param.width = e.pageX - idSeq.param.Xaxis;
			idSeq.param.height = e.pageY - idSeq.param.Yaxis;
			div.hidden = 1;
		};
		document.onkeypress = (e) => {
			if (e.key === "Y") {
				ipcRenderer.send("idSeq", idSeq);
				console.log(idSeq);
				showToast({
					str: "Screenshot action has been recorded",
					time: 1000,
					position: "bottom",
				});
				onmousedown = null;
				onmousemove = null;
				onmouseup = null;
			}
		};
	} else if (e.shiftKey && e.key) {
		e.preventDefault();
		var type, placeholder, label;
		e.path[0].type ? (type = e.path[0].type) : (type = undefined);
		e.path[0].placeholder
			? (placeholder = e.path[0].placeholder)
			: (placeholder = undefined);

		try {
			label = e.path[0].labels[0].innerText;
		} catch (error) {
			label = undefined;
		}
		let xp = xpath.getXPath(e);
		xp.includes("//*[@id=") ? xp : (xp = `/HTML/${xp}`);
		let idSeq = {
			tagName: `KeyPress`,
			type: type,
			placeholder: `Pressed "${e.key}"`,
			value: e.key,
			xpath: xp,
			ext: {
				label: label,
			},
			// parent: e.path,
			// parentLength: e.path.length,
		};
		console.log(idSeq);
		showToast({
			str: `pressed "${e.key}" key action has been recorded`,
			time: 1000,
			position: "bottom",
		});
		ipcRenderer.send("idSeq", idSeq);
	}
});

// Checking Internet status
const updateOnlineStatus = () => {
	showToast({
		str: `You are ${navigator.onLine ? "online" : "offline"}`,
		time: 1000,
		position: "bottom",
	});

	ipcRenderer.send(
		"online-status-changed",
		navigator.onLine ? "online" : "offline"
	);
};

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
