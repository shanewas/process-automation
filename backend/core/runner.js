async () => {
	await pie.initialize(app);
	browser = await pie.connect(app, puppeteer);
};
ipcMain.on("need-process", async function (e) {
	let isLoading = false;
	let autoLoad = false;
	let page = await pie.getPage(browser, loadingWindow, false).catch((err) => {
		isLoading = true;
	});
	let myNotification = new Notification("Title", {
		body: "Lorem Ipsum Dolor Sit Amet",
	});

	myNotification.onclick = () => {
		console.log("Notification clicked");
	};
	if (RUNINGSTATUS && !isLoading) {
		if (Math.floor(ITERATION / 2) === IDX && PROCESSCOUNTER == 0) {
			let notification = await botlist.setNotification(
				BOTS.botName,
				"log",
				" has completed half its task",
				"null"
			);
			win.webContents.send("notification-single", notification);
		}
		if (IDX < ITERATION) {
			console.log(`*** Iteration No. #${IDX} running ***`);
			console.log(`*** Currently on No. #${PROCESSCOUNTER} flowchart item ***`);
			element = BOTPROCESS.processSequence[PROCESSCOUNTER];
			let elements,
				dat,
				conditionStatus = true;
			try {
				switch (element._type) {
					case "LoadData":
						switch (element.entryType) {
							case "manual":
								dat = element.dataEntry;
								break;
							case "variable":
								let variable_obj = BOT_VARIABLES.find(
									(o) => o.name === element.dataEntry
								);
								dat = variable_obj.value;
								break;
							case "dataHeader":
								dat = LOCALDATA[element.dataEntry];
								break;
							default:
								break;
						}
						// conditions: [
						// {
						//     el1: '1',
						//     el1isManual: true,
						//     el1headerIdx: null,
						//     el2: '1',
						//     el2isManual: true,
						//     el2headerIdx: null,
						//     operator: '=',
						//     id: 'nBsg_r-5o'
						// }
						// ],
						console.log(`sending data to load ...`);
						if (element.conditions) {
							console.log(`checking conditions ...`);
							element.conditions.forEach((elem) => {
								if (!elem.el1isManual) {
									firstCond = LOCALDATA[elem.el1];
								} else {
									firstCond = elem.el1;
								}
								if (!elem.el2isManual) {
									secondCond = LOCALDATA[elem.el2];
								} else {
									secondCond = elem.el2;
								}
								switch (elem.operator) {
									case "=":
										if (!(firstCond === secondCond)) {
											console.log(firstCond);
											console.log(secondCond);
											conditionStatus = false;
										} else {
											console.log(firstCond);
											console.log(secondCond);
										}
										break;
									case ">":
										if (!(firstCond > secondCond)) {
											console.log(firstCond);
											console.log(secondCond);
											conditionStatus = false;
										} else {
											console.log(firstCond);
											console.log(secondCond);
										}
										break;
									case "<":
										if (!(firstCond < secondCond)) {
											console.log(firstCond);
											console.log(secondCond);
											conditionStatus = false;
										} else {
											console.log(firstCond);
											console.log(secondCond);
										}
										break;
									default:
										break;
								}
							});
						}
						if (conditionStatus) {
							if (element.type === "radio" || element.type === "checkbox") {
								if (element.ext.label === dat) {
									elements = await page.$x(element.xpath, {
										visible: true,
									});
									await elements[0].click();
								} else {
									loadingWindow.webContents.send("next-process");
									break;
								}
							} else {
								elements = await page.$x(element.xpath);
								await elements[0].type(dat);
							}
						}
						loadingWindow.webContents.send("next-process");
						break;
					case "click":
						console.log("clicking element ...");
						elements = await page.$x(element.xpath);
						await elements[0].click();
						loadingWindow.webContents.on("will-navigate", (event, url) => {
							autoLoad = true;
						});
						break;
					case "KeyBoard":
						console.log(`Pressing ${element.value} ...`);
						elements = await page.$x(element.xpath);
						await elements[0].press(`${element.value}`);
						loadingWindow.webContents.on("will-navigate", (event, url) => {
							autoLoad = true;
						});
						break;
					case "Extract Data":
						extracted_data = element[element.variableField];
						let variable_obj = BOT_VARIABLES.find(
							(o) => o.name === element.variableName
						);
						variable_obj.value = extracted_data;
						loadingWindow.webContents.send("next-process");
						console.log("Extracted Data " + extracted_data);
						break;
					case "ScreenShot":
						console.log(`Taking screenshot ...`);
						console.log(`will saving to ${element.imgpath}`);
						if (!fs.existsSync(element.imgpath)) {
							fs.mkdirSync(element.imgpath);
						}
						let img_filename = `${BOTS.botName}_${IDX}${PROCESSCOUNTER}.jpeg`;
						let pathTo = path.join(element.imgpath, img_filename);
						await page.evaluate((element) => {
							window.scroll(0, element.param.Yaxis);
						}, element);
						await page
							.screenshot({
								path: pathTo,
								type: "jpeg",
								clip: {
									x: element.param.Xaxis,
									y: element.param.Yaxis,
									width: element.param.width,
									height: element.param.height,
								},
							})
							.then(async () => {
								if (element.ocr) {
									await Jimp.read(pathTo)
										.then((screenshot) => {
											let ocr_img_filename = `${BOTS.botName}_OCR_${IDX}${PROCESSCOUNTER}.jpeg`;
											let ocr_pathTo = path.join(
												element.imgpath,
												"ocr_images/",
												ocr_img_filename
											);
											return screenshot
												.quality(100)
												.brightness(0.5)
												.contrast(0.5)
												.greyscale()
												.invert()
												.write(ocr_pathTo);
										})
										.then(async () => {
											if (!fs.existsSync(element.ocrpath)) {
												fs.mkdirSync(element.ocrpath);
											}
											let ocr_filename = `${BOTS.botName}_${IDX}${PROCESSCOUNTER}.txt`;
											let saveTo = path.join(element.ocrpath, ocr_filename);
											await Tesseract.recognize(pathTo, "eng", {
												logger: (m) => console.log(m),
											}).then(async ({ data: { text } }) => {
												console.log(text);
												let variable_obj = BOT_VARIABLES.find(
													(o) => o.name === element.variableName
												);
												variable_obj.value = text;
												fs.writeFile(saveTo, text, (err) => {
													err
														? console.log("Canceled!")
														: console.log("Saved!");
												});
											});
										})
										.catch((err) => {
											throw err;
										});
								}
							})
							.finally(() => {
								loadingWindow.webContents.send("next-process");
							});
						break;
					case "link":
						console.log("loading url ... " + page.url());
						await page.goto(element.link);
						break;
					default:
						console.log("_type doesnt match");
				}
			} catch (error) {
				var errorGen = {
					datatime: new Date(),
					type: element._type,
					DataLength: `#${DATA.length}`,
					CurrentDataRow: `${JSON.stringify(LOCALDATA)}`,
					Iteration: `#${IDX}`,
					ProcCount: `#${PROCESSCOUNTER}`,
					ProcSeq_elem: element,
					Error: error,
				};
				ERRSTATUS.push(errorGen);
				console.log(ERRSTATUS);
				let notification = await botlist.setNotification(
					BOTS.botName,
					"error",
					` is facing an issue with #${PROCESSCOUNTER} process in #${IDX} Iteration`,
					"null"
				);
				win.webContents.send("notification-single", notification);
				// loadingWindow.webContents.send("next-process-state-change");
			}
			if (PROCESSCOUNTER + 1 >= PROCESSLENGTH) {
				PROCESSCOUNTER = 0;
				if (BOTS.filepath) LOCALDATA = DATA.pop();
				IDX++;
			} else {
				PROCESSCOUNTER++;
				if (!autoLoad) {
					loadingWindow.webContents.send("next-process");
				}
			}
		} else {
			let notification = await botlist.setNotification(
				BOTS.botName,
				"log",
				" has completed its task",
				"null"
			);
			win.webContents.send("notification-single", notification);
			win.setProgressBar(0.0);
			reset_var();
			BOTALREADYOPENED = false;
			loadingWindow.hide();
			loadingWindow.destroy();
		}
		win.setProgressBar(IDX / ITERATION);
	}
});
