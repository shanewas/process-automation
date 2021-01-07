export default (process) => {
  switch (process._type) {
    case "link":
      return {
        ...process,
        title: "Link",
        text: `Opened link ${process.link}`,
      };
    case "click":
      return {
        ...process,
        title: "Clicked",
        text: `Clicked on a '${process.tagName}'`,
      };
    case "LoadData":
      return {
        ...process,
        title: "Load Data",
        text: `Load data to ${process.tagName}`,
      };
    case "KeyBoard":
      return {
        ...process,
        title: "Key Pressed",
        text: `'${process.value}' key Pressed`,
      };
    case "ScreenShot":
      return {
        ...process,
        title: "Screenshot",
        text: "Screenshot taken",
      };
    case "Extract Data":
      return {
        ...process,
        title: "Extract Data",
        text: `Saving '${process.variableField}' field to '${process.saveToVariable}' variable`,
      };
    case "upload":
      return {
        ...process,
        title: "Upload",
        text: "Upload File",
      };
    case "download":
      return {
        ...process,
        title: "Download",
        text: "Download folder path specified",
      };
  }
};
