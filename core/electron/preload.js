const xpath = require("../modules/xpath");
const { app, ipcRenderer } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const showToast = require("show-toast");

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
	if (e.shiftKey && e.key === "T") {
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
			ocr: false,
			imgpath: isDev
				? path.join("./backend/data/screenshot/")
				: // : path.join("./backend/data/screenshot/", fileName), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  // : path.join("./backend/data/screenshot/", fileName).replace('/app.asar', ''), //LINUX BUILD TILL SPRINT 2 TODO: Figure out how to handle this
				  path.join(app.getAppPath("userData"), "../backend/data/screenshot/"), // WINDOWS BUILD
			// : path.join(__dirname, "../data/screenshot", fileName).replace('/app.asar', ''),
		};
		console.log(idSeq);
		showToast({
			str: "Screenshot action has been recorded",
			time: 1000,
			position: "bottom",
		});
		ipcRenderer.send("idSeq", idSeq);
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
