
export const electron = window.require("electron");
export const { ipcRenderer } = electron;

export const editBotChannel="edit-bot";
export const addBotChannel="add-bot";
export const deleteBotChannel="delete-bot";
export const startBotChannel="start-bot";
export const SearchLinkChannel="search-link";


// window.onload = function () {
	
// 	function editClick(){
// 		console.log("dasdas")
// 	}

// 	// if(!!EditBot)
// 	// {
// 	// 	EditBot.addEventListener("click", function () {
// 	// 		console.log(EditBot.id)
// 	// 		ipcRenderer.send("show-window");
// 	// 	});
// 	// }
	
// };
// const electron = require("electron");
// const electron = window.require("electron");
// const { ipcRenderer } = electron;

function send(teleport, content) {
	ipcRenderer.send(teleport, content);
}

function tests() {
	return 2;
}

window.onload = function () {
	const test = document.getElementById("test");
	test.addEventListener("click", function () {
		send("show-window", tests());
	});
};
