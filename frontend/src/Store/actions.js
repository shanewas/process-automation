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

export function SendProcessAction(process) {
  return { type: "SEND_PROCESS", process };
}
export function editProcessAction(process, index) {
  return { type: "EDIT_PROCESS", process, index };
}
export function selectBotAction(bot) {
  return { type: "SELECT_BOT", bot };
}
export function clearAllAction() {
  return { type: "CLEAR_All" };
}
export function clearFlowchartAction() {
  return { type: "CLEAR_FLOWCHART" };
}
export function clearDatasetAction() {
  return { type: "CLEAR_DATASET" };
}
export function removeStepAction(index, num_of_step) {
  return { type: "REMOVE_STEP", index, num_of_step };
}

export function loadBotAction(bot) {
  return { type: "LOAD_BOT", bot };
}

export function manualDataEntry(dataEntry, processIndex) {
  return { type: "MANUAL_DATA_ENTRY", dataEntry, processIndex };
}

export function iterationChangeAction(iterationNumber) {
  return { type: "SAVE_ITERATION", iterationNumber };
}

export function loadDatasetProperties(properties) {
  return { type: "LOADED_DATASET_PROPERTIES", properties };
}

export const saveVariables = (variables) => ({
  type: "SAVE_VARIABLES",
  variables,
});
export const assignVariable = (id, processId) => ({
  type: "ASSIGN_VARIABLE",
  id,
  processId,
});
export const consumeVariable = (id, processId) => ({
  type: "CONSUME_VARIABLE",
  id,
  processId,
});
