const initState = {
  headers: [],
  variables: [],
  selectedHeader: null,
  status: [],
  filepath: null,
  process: [],
  botName: null,
  prevStatus: null,
  botIteration: 1,
  datasetProperties: null,
};

const saveVariables = (state, variables) => ({
  ...state,
  variables,
});

const loadHeaders = (state, headers, path) => {
  const headerExample = headers;
  const status = new Array(headerExample.length).fill("notSelected");
  return {
    ...state,
    headers: headerExample,
    status: status,
    filepath: path,
  };
};
const changeHeaders = (state, index) => {
  if (state.selectedHeader === null) {
    const newstatus = [...state.status];
    const prev = newstatus[index];
    newstatus[index] = "changing";
    return {
      ...state,
      status: newstatus,
      selectedHeader: index,
      prevStatus: prev,
    };
  } else {
    if (index === state.selectedHeader) {
      return {
        ...state,
      };
    } else {
      const newstatus = [...state.status];
      const prev = newstatus[index];
      newstatus[index] = "changing";
      newstatus[state.selectedHeader] = state.prevStatus;
      return {
        ...state,
        status: newstatus,
        selectedHeader: index,
        prevStatus: prev,
      };
    }
  }
};
const areotherusing = (state, index, header) => {
  var newprocess = [...state.process];
  for (var x = 0; x < newprocess.length; x++) {
    if (x !== index) {
      if (newprocess[x].dataEntry === header) {
        return true;
      }
    }
  }
  return false;
};
const selectHeaders = (state, index) => {
  var newprocess = [...state.process];
  const newstatus = [...state.status];

  if (
    "dataEntry" in newprocess[index] &&
    !areotherusing(state, index, newprocess[index].dataEntry)
  ) {
    newstatus[newprocess[index].dataEntryindex] = "notSelected";
  }
  newprocess[index].dataEntry = state.headers[state.selectedHeader];
  newprocess[index].entryType = "dataHeader";
  newprocess[index].dataEntryindex = state.selectedHeader;
  newstatus[state.selectedHeader] = "used";

  return {
    ...state,
    status: newstatus,
    selectedHeader: null,
    process: newprocess,
  };
};

const UnselectHeader = (state, index) => {
  const newstatus = [...state.status];
  newstatus[index] = "notSelected";
  return {
    ...state,
    status: newstatus,
  };
};
const EntryProcess = (state, process) => {
  console.log(process)
  const newprocess = [...state.process, process];
  return {
    ...state,
    process: newprocess,
  };
};
const editProcess = (state, process, index) => {
  const {
    dataEntry,
    entryType,
    // variableField,
    variableName,
    // variableUsed,
    id,
  } = process;
  const oldProcess = state.process.find((p) => p.id === id);
  let variables = [...state.variables];

  // Using (Load Data - DATA ENTRY)
  if (entryType === "variable") {
    if (oldProcess.entryType !== "variable") {
      console.log("using variable first time [DE]");
      // ADD - first time using
      variables = variables.map((v) =>
        v.name === dataEntry ? { ...v, usedBy: [...v.usedBy, id] } : v
      );
    } else if (
      oldProcess.entryType === "variable" &&
      dataEntry !== oldProcess.dataEntry
    ) {
      // REMOVE AND ADD (Variable changed)
      variables = variables.map((v) => {
        if (v.name === oldProcess.dataEntry)
          return { ...v, usedBy: v.usedBy.filter((tv) => tv !== id) };
        else if (v.name === dataEntry)
          return { ...v, usedBy: [...v.usedBy, id] };
        else return v;
      });
    }
  } else if (oldProcess.entryType === "variable" && entryType !== "variable") {
    // remove entryType changed from variable
    variables = variables.map((v) =>
      v.name === oldProcess.dataEntry
        ? { ...v, usedBy: v.usedBy.filter((tv) => tv !== id) }
        : v
    );
  }

  // Assigning (Extract Data, OCR?)
  if (oldProcess.variableName !== variableName && !oldProcess.variableName) {
    console.log("assigning variable first time");
    // first time assigning a variable
    variables = variables.map((v) =>
      v.name === variableName ? { ...v, assignors: [...v.assignors, id] } : v
    );
  } else if (oldProcess.variableName !== variableName) {
    console.log("removing previous one and adding new one");
    // changed
    variables = variables.map((v) => {
      // remove the process id from the previous variable assignors array
      if (v.name === oldProcess.variableName)
        return {
          ...v,
          assignors: v.assignors.filter((tv) => tv !== id),
        };
      // add the process id to  the new variable assignors array
      else if (v.name === variableName)
        return { ...v, assignors: [...v.assignors, id] };
      else return v;
    });
  }

  console.log({ variables });

  var newprocess = [...state.process];

  newprocess[index] = process;
  return {
    ...state,
    process: newprocess,
    variables,
  };
};
const clearAll = (state) => {
  return {
    ...state,
    headers: [],
    variables: [],
    selectedHeader: null,
    status: [],
    filepath: null,
    process: [],
    botName: null,
    prevStatus: null,
  };
};
const clearFlowchart = (state) => {
  const status = new Array(state.headers.length).fill("notSelected");
  return {
    ...state,
    process: [],
    status: status,
  };
};
const clearDataset = (state) => {
  return {
    ...state,
    filepath: null,
    prevStatus: null,
    headers: [],
    selectedHeader: null,
    status: [],
  };
};
const removeStep = (state, index, num_of_step) => {
  let newprocess = [...state.process];
  newprocess.splice(index, num_of_step);
  return {
    ...state,
    process: newprocess,
  };
};

const loadBot = (state, bot) => {
  return {
    ...state,
    variables: bot.variables,
    headers: bot.header,
    status: bot.status,
    filepath: bot.filepath,
    selectedHeader: null,
    prevStatus: null,
    botName: bot.botName,
    process: bot.process,
    botIteration: bot.iteration,
  };
};

const manualDataEntry = (state, dataEntry, index) => {
  let newprocess = [...state.process];
  newprocess[index].dataEntry = dataEntry;
  const newstatus = [...state.status];
  if ("dataEntry" in newprocess[index]) {
    if (!areotherusing(state, index, newprocess[index].dataEntry)) {
      newstatus[newprocess[index].dataEntryindex] = "notSelected";
    }
    // delete newprocess[index].dataEntry;
    delete newprocess[index].dataEntryindex;
  }
  return {
    ...state,
    process: newprocess,
    status: newstatus,
  };
};

const changeIteration = (state, iterationNumber) => {
  return {
    ...state,
    botIteration: iterationNumber,
  };
};

const changeDatasetProperties = (state, datasetProperties) => {
  return {
    ...state,
    datasetProperties: datasetProperties,
  };
};
const rootReducer = (state = initState, action) => {
  console.log(action.type);

  switch (action.type) {
    case "SAVE_VARIABLES":
      return saveVariables(state, action.variables);
    case "LOAD_HEADERS":
      return loadHeaders(state, action.headers, action.path);
    case "CHANGE_HEADER":
      return changeHeaders(state, action.index);
    case "USE_HEADER":
      return selectHeaders(state, action.index);
    case "UNSELECT_HEADER":
      return UnselectHeader(state, action.index);
    case "SEND_PROCESS":
      return EntryProcess(state, action.process);
    case "EDIT_PROCESS":
      return editProcess(state, action.process, action.index);
    case "CLEAR_All":
      return clearAll(state);
    case "CLEAR_FLOWCHART":
      return clearFlowchart(state);
    case "CLEAR_DATASET":
      return clearDataset(state);
    case "REMOVE_STEP":
      return removeStep(state, action.index, action.num_of_step);
    case "LOAD_BOT":
      return loadBot(state, action.bot);
    case "MANUAL_DATA_ENTRY":
      return manualDataEntry(state, action.dataEntry, action.processIndex);
    case "SAVE_ITERATION":
      return changeIteration(state, action.iterationNumber);
    case "LOADED_DATASET_PROPERTIES":
      return changeDatasetProperties(state, action.properties);
    default:
      return state;
  }
};
export default rootReducer;
