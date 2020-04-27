const botlist = require("../../backend/dataControl/botlist");
window.onload = function () {
	const body = document.querySelector("body");
	body.addEventListener("click", (e) => {
		if (e.shiftKey) {
			e.preventDefault();
		}
	});
};
