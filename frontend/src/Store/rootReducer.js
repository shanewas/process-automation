const initState = {
  // change name to headers
  headers: [],
  variables: [],
  process: [],
  botName: null,
  csvs: {
    "1mw1w01": {
      filename: "Cool.csv",
      filepath: "/users/doc/cool.csv",
      headers: ["cool1", "cool2", "cool3"],
    },
    "14910s": {
      filename: "dope.csv",
      filepath: "/users/doc/dope.csv",
      headers: ["dope1", "dope2", "dope3"],
    },
  },
  errors: {},
  groups: {},
  botIteration: 1,
  saved: true,
  screenshotPath: "",
  socket: "",
  ip: "",
  port: "",
  browserAgent: "",
  // proxy: "",
  // selectedHeader: null,
  // status: [],
  // filepath: null,
  // prevStatus: null,
  // change name to csvInfo
  // datasetProperties: null,
};

const deleteGroup = (state, { name }) => {
  console.log({ name });
  const tState = { ...state };
  delete tState.groups[name];
  return { ...tState, saved: false };
};

const editGroup = (state, { name, ...other }) => ({
  ...state,
  groups: {
    ...state.groups,
    [name]: {
      ...other,
      processes: state.groups[name].processes,
    },
  },
  saved: false,
});

const createGroup = (state, { name, ...other }) => ({
  ...state,
  groups: {
    ...state.groups,
    [name]: {
      ...other,
      processes: [],
    },
  },
  saved: false,
});
const addToGroup = (state, { groupName, processId }) => ({
  ...state,
  groups: {
    ...state.groups,
    [groupName]: {
      ...state.groups[groupName],
      processes: [...state.groups[groupName].processes, processId],
    },
  },
  saved: false,
});

const removeFromGroup = (state, { groupName, processId }) => ({
  ...state,
  groups: {
    ...state.groups,
    [groupName]: {
      ...state.groups[groupName],
      processes: state.groups[groupName].processes.filter(
        (p) => p !== processId
      ),
    },
  },
  saved: false,
});

const changeProcessOrder = (state, { source, destination, draggableId }) => {
  const newProcess = Array.from(state.process);
  const draggedProcess = newProcess.find((p) => p.id === draggableId);

  newProcess.splice(source.index, 1);
  newProcess.splice(destination.index, 0, draggedProcess);

  return {
    ...state,
    process: newProcess,
    saved: false,
  };
};

const updateErrors = (state, errors) => ({ ...state, errors });

const saveBot = (state) => ({ ...state, saved: true });

const createVariable = (state, name) => ({
  ...state,
  saved: false,
  variables: [...state.variables, { name, associatedWith: [] }],
});

const removeVariable = (state, name) => ({
  ...state,
  saved: false,
  variables: state.variables.filter((variable) => variable.name !== name),
});

const saveVariables = (state, variables) => ({
  ...state,
  saved: false,
  variables,
});

const unlinkCsv = (state) => ({
  ...state,
  saved: false,
  headers: [],
  csvInfo: null,
});
const newBot = (state, botName) => ({
  ...state,
  saved: true,
  botName,
});

const updateBot = (state, data) => ({
  ...state,
  saved: false,
  ...data,
});

const loadCsv = (state, headers) => {
  // const headers = tHeaders.map((h) => ({ name: h, usedBy: [] }));
  // return { ...state, saved: false, headers, csvInfo };
};

const clearAll = (_) => ({ ...initState });

// const loadHeaders = (state, headers, path) => {
//   // console.log({ headers, path });
//   const headerExample = headers;
//   const status = new Array(headerExample.length).fill("notSelected");
//   return {
//     ...state,
// saved:false,
//     headers: headerExample,
//     status: status,
//     filepath: path,
//   };
// };
// const changeHeaders = (state, index) => {
//   console.log("!!!! change headers ", index);
//   if (state.selectedHeader === null) {
//     const newstatus = [...state.status];
//     const prev = newstatus[index];
//     newstatus[index] = "changing";
//     return {
//       ...state,
// saved:false,
//       status: newstatus,
//       selectedHeader: index,
//       prevStatus: prev,
//     };
//   } else {
//     if (index === state.selectedHeader) {
//       return {
//         ...state,
// saved:false,
//       };
//     } else {
//       const newstatus = [...state.status];
//       const prev = newstatus[index];
//       newstatus[index] = "changing";
//       newstatus[state.selectedHeader] = state.prevStatus;
//       return {
//         ...state,
// saved:false,
//         status: newstatus,
//         selectedHeader: index,
//         prevStatus: prev,
//       };
//     }
//   }
// };
// const areotherusing = (state, index, header) => {
//   var newprocess = [...state.process];
//   for (var x = 0; x < newprocess.length; x++) {
//     if (x !== index) {
//       if (newprocess[x].dataEntry === header) {
//         return true;
//       }
//     }
//   }
//   return false;
// };
// const selectHeaders = (state, index) => {
//   var newprocess = [...state.process];
//   const newstatus = [...state.status];

//   if (
//     "dataEntry" in newprocess[index] &&
//     !areotherusing(state, index, newprocess[index].dataEntry)
//   ) {
//     newstatus[newprocess[index].dataEntryindex] = "notSelected";
//   }
//   newprocess[index].dataEntry = state.headers[state.selectedHeader];
//   newprocess[index].entryType = "dataHeader";
//   newprocess[index].dataEntryindex = state.selectedHeader;
//   newstatus[state.selectedHeader] = "used";

//   return {
//     ...state,
// saved:false,
//     status: newstatus,
//     selectedHeader: null,
//     process: newprocess,
//   };
// };

// const UnselectHeader = (state, index) => {
//   const newstatus = [...state.status];
//   newstatus[index] = "notSelected";
//   return {
//     ...state,
// saved:false,
//     status: newstatus,
//   };
// };
const newProcess = (state, process) => {
  const newprocess = [...state.process, process];
  return {
    ...state,
    saved: false,
    process: newprocess,
  };
};

const editProcess = (state, process, index) => {
  const { dataEntry, entryType, saveToVariable = "", id } = process;
  const oldProcess = state.process.find((p) => p.id === id);
  let variables = [...state.variables];
  let headers = [...state.headers];

  // Using variable for dataEntry value
  if (entryType === "variable") {
    // Using variable for first time
    if (oldProcess.entryType !== "variable") {
      console.log("variable using - first time");
      // mapping over variables and finding the one to add 'this' particular step's id into it
      variables = variables.map((v) =>
        v.name === dataEntry
          ? { ...v, associatedWith: [...v.associatedWith, id] }
          : v
      );
    }
    // Changed the variable to some other value
    else if (oldProcess.dataEntry !== dataEntry) {
      console.log("variable - removing and adding");
      // REMOVE AND ADD (Variable changed)
      variables = variables.map((v) => {
        if (v.name === oldProcess.dataEntry)
          return {
            ...v,
            associatedWith: v.associatedWith.filter((tv) => tv !== id),
          };
        else if (v.name === dataEntry)
          return { ...v, associatedWith: [...v.associatedWith, id] };
        else return v;
      });
    }
  }
  // Changed the type to something else, so gotta remove the previously used variable
  else if (oldProcess.entryType === "variable" && entryType !== "variable") {
    // remove entryType changed from variable
    variables = variables.map((v) =>
      v.name === oldProcess.dataEntry
        ? { ...v, associatedWith: v.associatedWith.filter((tv) => tv !== id) }
        : v
    );
  }
  // checking for headers(csv)
  if (entryType === "dataHeader") {
    console.log("data header to hai bhai");

    // Using variable for first time
    if (oldProcess.entryType !== "dataHeader") {
      console.log("data header - pehli dafa");
      headers = headers.map((h) =>
        h.name === dataEntry ? { ...h, usedBy: [...h.usedBy, id] } : h
      );
    }
    // Changed the header to some other value
    else if (oldProcess.dataEntry !== dataEntry) {
      console.log("removing and add");
      // REMOVE AND ADD (header changed)
      headers = headers.map((h) => {
        if (h.name === oldProcess.dataEntry)
          return {
            ...h,
            usedBy: h.usedBy.filter((th) => th !== id),
          };
        else if (h.name === dataEntry)
          return { ...h, usedBy: [...h.usedBy, id] };
        else return h;
      });
    }
  }
  // Changed the type to something else, so gotta remove the previously used dataheader
  else if (
    oldProcess.entryType === "dataHeader" &&
    entryType !== "dataHeader"
  ) {
    console.log("data-header - hata diya");
    // remove entryType changed from variable
    headers = headers.map((h) =>
      h.name === oldProcess.dataEntry
        ? { ...h, usedBy: h.usedBy.filter((th) => th !== id) }
        : h
    );
  }

  // Assigning/Saving to variable (Extract Data, OCR?)
  if (saveToVariable) {
    // first time assigning a variable
    // variables = variables.map((v) =>
    //   v.name === saveToVariable
    //     ? { ...v, associatedWith: [...v.associatedWith, id] }
    //     : v
    // );
    // } else

    // first + changing
    if (oldProcess.saveToVariable !== saveToVariable) {
      console.log("removing previous one and adding new one");
      // changed
      variables = variables.map((v) => {
        // remove the process id from the previous variable associatedWith array
        if (v.name === oldProcess.saveToVariable)
          return {
            ...v,
            associatedWith: v.associatedWith.filter((tv) => tv !== id),
          };
        // add the process id to  the new variable associatedWith array
        else if (v.name === saveToVariable)
          return { ...v, associatedWith: [...v.associatedWith, id] };
        else return v;
      });
    }
  } else if (oldProcess.saveToVariable && !saveToVariable) {
    console.log("just removing");
    // remove entryType changed from variable
    variables = variables.map((v) =>
      v.name === oldProcess.saveToVariable
        ? { ...v, associatedWith: v.associatedWith.filter((tv) => tv !== id) }
        : v
    );
  }

  var newprocess = [...state.process];

  const errors = { ...state.errors };
  delete errors[id];

  newprocess[index] = process;
  return {
    ...state,
    saved: false,
    process: newprocess,
    variables,
    headers,
    errors,
  };
};
// const clearAll = (state) => {
//   return {
//     ...state,
// saved:false,
//     headers: [],
//     variables: [],
//     selectedHeader: null,
//     status: [],
//     filepath: null,
//     process: [],
//     botName: null,
//     prevStatus: null,
//   };
// };
// TODO
// const clearFlowchart = (state) => {
//   const status = new Array(state.headers.length).fill("notSelected");
//   return {
//     ...state,
// saved:false,
//     process: [],
//     status: status,
//   };
// };
// const clearDataset = (state) => {
//   return {
//     ...state,
// saved:false,
//     filepath: null,
//     prevStatus: null,
//     headers: [],
//     selectedHeader: null,
//     status: [],
//   };
// };

const removeStep = (state, stepIdx) => {
  const process = state.process[stepIdx];
  let variables = [...state.variables];
  let headers = [...state.headers];
  // check if entryType is variable, if yes de-associate the variable
  if (process.entryType === "variable" || !!process.saveToVariable) {
    variables = variables.map((tv) =>
      tv.name === process.dataEntry || tv.name === process.saveToVariable
        ? {
            ...tv,
            associatedWith: tv.associatedWith.filter(
              (stepId) => stepId !== process.id
            ),
          }
        : tv
    );
  } else if (process.entryType === "dataHeader") {
    headers = headers.map((th) =>
      th.name === process.dataEntry
        ? {
            ...th,
            usedBy: th.usedBy.filter((stepId) => stepId !== process.id),
          }
        : th
    );
  }

  let newProcess = state.process.filter((step, idx) => idx !== stepIdx);

  const errors = { ...state.errors };
  delete errors[process.id];

  return {
    ...state,
    saved: false,
    variables,
    headers,
    process: newProcess,
    errors,
  };
};

const loadBot = (state, bot) => {
  return {
    ...state,
    saved: true,
    ...bot,
  };
};

// const manualDataEntry = (state, dataEntry, index) => {
//   let newprocess = [...state.process];
//   newprocess[index].dataEntry = dataEntry;
//   const newstatus = [...state.status];
//   if ("dataEntry" in newprocess[index]) {
//     if (!areotherusing(state, index, newprocess[index].dataEntry)) {
//       newstatus[newprocess[index].dataEntryindex] = "notSelected";
//     }
//     // delete newprocess[index].dataEntry;
//     delete newprocess[index].dataEntryindex;
//   }
//   return {
//     ...state,
// saved:false,
//     process: newprocess,
//     status: newstatus,
//   };
// };

// const changeIteration = (state, iterationNumber) => {
//   return {
//     ...state,
// saved:false,
//     botIteration: iterationNumber,
//   };
// };

// const changeDatasetProperties = (state, datasetProperties) => {
//   // console.log(datasetProperties);
//   return {
//     ...state,
// saved:false,
//     datasetProperties: datasetProperties,
//   };
// };
const rootReducer = (state = initState, action) => {
  console.log(action.type);

  switch (action.type) {
    case "DELETE_GROUP":
      return deleteGroup(state, action.payload);
    case "REMOVE_FROM_GROUP":
      return removeFromGroup(state, action.payload);
    case "ADD_TO_GROUP":
      return addToGroup(state, action.payload);
    case "EDIT_GROUP":
      return editGroup(state, action.payload);
    case "CREATE_GROUP":
      return createGroup(state, action.payload);
    case "UPDATE_BOT":
      return updateBot(state, action.data);
    case "NEW_BOT":
      return newBot(state, action.botName);
    case "LOAD_CSV":
      return loadCsv(state, action.headers);
    case "UNLINK_CSV":
      return unlinkCsv(state, action.csv);
    case "CREATE_VARIABLE":
      return createVariable(state, action.name);
    case "REMOVE_VARIABLE":
      return removeVariable(state, action.name);
    case "SAVE_VARIABLES":
      return saveVariables(state, action.variables);
    case "EDIT_PROCESS":
      return editProcess(state, action.process, action.index);
    case "REMOVE_STEP":
      return removeStep(state, action.stepIdx);
    case "LOAD_BOT":
      return loadBot(state, action.bot);
    case "CLEAR_All":
      return clearAll(state);
    case "NEW_PROCESS":
      return newProcess(state, action.process);
    case "SAVE_BOT":
      return saveBot(state);
    case "UPDATE_ERRORS":
      return updateErrors(state, action.errors);
    case "CHANGE_PROCESS_ORDER":
      return changeProcessOrder(state, action.result);
    // case "CHANGE_HEADER":
    //   return changeHeaders(state, action.index);
    // case "USE_HEADER":
    //   return selectHeaders(state, action.index);
    // case "UNSELECT_HEADER":
    //   return UnselectHeader(state, action.index);
    // case "CLEAR_FLOWCHART":
    //   return clearFlowchart(state);
    // case "CLEAR_DATASET":
    //   return clearDataset(state);
    // case "MANUAL_DATA_ENTRY":
    //   return manualDataEntry(state, action.dataEntry, action.processIndex);
    // case "SAVE_ITERATION":
    //   return changeIteration(state, action.iterationNumber);
    // case "LOADED_DATASET_PROPERTIES":
    //   return changeDatasetProperties(state, action.properties);
    default:
      return state;
  }
};
export default rootReducer;
