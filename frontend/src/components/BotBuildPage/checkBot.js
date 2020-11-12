export default (processes) => {
  const warnings = {};

  processes.forEach((process) => {
    const type = process._type;
    if (type === "LoadData" && !process.dataEntry) {
      warnings[process.id] = { type, message: "Data entry is required" };
    }

    if (type === "link" && !process.link) {
      warnings[process.id] = { type, message: "Link is required" };
    }
  });

  return warnings;
};
