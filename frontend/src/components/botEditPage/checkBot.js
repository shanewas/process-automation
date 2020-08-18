export default (processes, headers) => {
  const warnings = {};
  console.log(headers);

  processes.forEach((process) => {
    const type = process._type;
    if (type === "LoadData" && !process.dataEntry) {
      warnings[process.id] = { type, message: "Data entry is required" };
    }

    if (
      type === "LoadData" &&
      process.entryType === "dataHeader" &&
      !headers.includes(process.dataEntry)
    ) {
      warnings[process.id] = {
        type,
        message: "Please link to the correct CSV file, data header not found.",
      };
    }

    if (type === "link" && !process.link) {
      warnings[process.id] = { type, message: "Link is required" };
    }
  });

  return warnings;
};
