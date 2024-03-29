export const deleteGroup = (name) => ({
  type: "DELETE_GROUP",
  payload: { name },
});
export const removeFromGroup = (groupName, processId) => ({
  type: "REMOVE_FROM_GROUP",
  payload: { groupName, processId },
});
export const addToGroup = (groupName, toAdd) => ({
  type: "ADD_TO_GROUP",
  payload: { groupName, toAdd },
});
export const createGroup = (group) => ({
  type: "CREATE_GROUP",
  payload: group,
});

export const editGroup = (group) => ({
  type: "EDIT_GROUP",
  payload: group,
});

export const updateErrors = (errors) => ({
  type: "UPDATE_ERRORS",
  errors,
});

export const changeProcessOrder = (result) => ({
  type: "CHANGE_PROCESS_ORDER",
  result,
});

export const loadBot = (bot) => ({ type: "LOAD_BOT", bot });

export const clearAll = () => ({ type: "CLEAR_All" });

export const saveBot = () => ({ type: "SAVE_BOT" });

export const updateBot = (data) => {
  return { type: "UPDATE_BOT", data };
};

export const newBot = (botName) => {
  return { type: "NEW_BOT", botName };
};
export const updateCsv = (csv) => {
  return { type: "UPDATE_CSV", payload: csv };
};
export const addCsv = (csv) => {
  return { type: "ADD_CSV", payload: csv };
};

export const unlinkCsv = () => {
  return { type: "UNLINK_CSV" };
};
export const loadHeaderAction = (headers, path) => {
  return { type: "LOAD_HEADERS", headers, path };
};

export function ChangeHeaderAction(index) {
  return { type: "CHANGE_HEADER", index };
}

export function UseHeaderAction(index) {
  return { type: "USE_HEADER", index };
}

export function UnselectHeaderAction(index) {
  return { type: "UNSELECT_HEADER", index };
}

export function newProcessAction(process) {
  return { type: "NEW_PROCESS", process };
}
export function editProcessAction(process, index) {
  return { type: "EDIT_PROCESS", process, index };
}
export function selectBotAction(bot) {
  return { type: "SELECT_BOT", bot };
}
// export function clearAllAction() {
//   return { type: "CLEAR_All" };
// }
export function clearFlowchartAction() {
  return { type: "CLEAR_FLOWCHART" };
}
export function clearDatasetAction() {
  return { type: "CLEAR_DATASET" };
}
export const removeStep = (stepIdx) => ({ type: "REMOVE_STEP", stepIdx });

export function manualDataEntry(dataEntry, processIndex) {
  return { type: "MANUAL_DATA_ENTRY", dataEntry, processIndex };
}

export function iterationChangeAction(iterationNumber) {
  return { type: "SAVE_ITERATION", iterationNumber };
}

export function loadDatasetProperties(properties) {
  return { type: "LOADED_DATASET_PROPERTIES", properties };
}

export const createVariable = (payload) => ({
  type: "CREATE_VARIABLE",
  payload,
});
export const removeVariable = (name) => ({
  type: "REMOVE_VARIABLE",
  name,
});

export const saveVariables = (variables) => ({
  type: "SAVE_VARIABLES",
  variables,
});
