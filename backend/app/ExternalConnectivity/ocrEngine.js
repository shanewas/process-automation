const { ipcMain, dialog } = require("electron");
const Jimp = require("jimp");
const Tesseract = require("tesseract.js");

ipcMain.on("ocr-engine", async (event) => {
	let upload_options = {
		title: "Optical character recognition",
		buttonLabel: "Upload",
		filters: [{ name: "Images", extensions: ["jpg", "png"] }],
	};
	let save_options = {
		title: "Save OCR results",
		buttonLabel: "Save",
		filters: [
			{ name: "Text", extensions: ["txt"] },
			{ name: "All Files", extensions: ["*"] },
		],
	};
	(await dialog.showOpenDialog(win, upload_options)).filePaths.forEach(
		(path) => {
			Jimp.read(path)
				.then((image) => {
					return (
						image
							.quality(60)
							.brightness(0.1)
							.contrast(0.1)
							.greyscale()
							// .invert()
							.write(path)
					); // save
				})
				.then(async () => {
					Tesseract.recognize(path, "eng", {
						logger: (m) => console.log(m),
					}).then(async ({ data: { text } }) => {
						console.log(text);
						fs.writeFile(
							(await dialog.showSaveDialog(win, save_options)).filePath,
							text,
							(err) => {
								err ? console.log("Canceled!") : console.log("Saved!");
							}
						);
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	);
});
