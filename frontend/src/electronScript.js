
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
