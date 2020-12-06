export default (process) => {
  switch (process._type) {
    case "link":
      return {
        ...process,
        _type: process._type,
        title: "Link",
        text: `Opened link ${process.link}`,
      };
    case "click":
      return {
        ...process,
        _type: process._type,
        title: "Clicked",
        text: `Clicked on a '${process.tagName}'`,
      };
    case "LoadData":
      return {
        ...process,
        _type: process._type,
        title: "Load Data",
        text: `Load data to ${process.tagName}`,
      };
    case "KeyBoard":
      return {
        ...process,
        _type: process._type,
        title: "Key Pressed",
        text: `'${process.value}' key Pressed`,
      };
    case "ScreenShot":
      return {
        ...process,
        _type: process._type,
        title: "Screenshot",
        text: "Screenshot taken",
      };
  }
};
