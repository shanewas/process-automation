import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  IconButton,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import TypeScreenshot from "./TypeScreenshot";
import TypeLink from "./TypeLink";
import TypeClick from "./TypeClick";
import TypeLoadData from "./TypeLoadData";
import SelectorInput from "../../layout/input/SelectorInput";
import TypeExtractData from "./TypeExtractData";
import { useDispatch, useSelector } from "react-redux";
import generateStepObject from "../../BotBuildPage/utils/generateStepObject";
import { editProcessAction } from "../../../Store/actions";

const initFields = {
  ocr: false,
  label: "",
  link: "",
  variableField: "",
  saveToVariable: "",
  variableUsed: "",
  entryType: "manual",
  dataEntry: "",
};
const types = ["LoadData", "link", "click", "ScreenShot", "Extract Data"];
const inputTypes = ["null", "radio", "password", "text", "checkbox", "email"];
const extractDataFields = ["xpath", "label", "placeholder", "value"];

const resetFields = {
  variableField: "",
  saveToVariable: "",
  variableUsed: "",
  entryType: "manual",
  dataEntry: "",
  ocr: false,
};

export default ({ open, handleClose, stepIdx }) => {
  const { currentStep, currentVariables, currentHeaders } = useSelector(
    ({ process, variables, headers }) => ({
      currentStep: process[stepIdx],
      currentVariables: variables,
      currentHeaders: headers,
    })
  );
  const [step, setStep] = useState({ ...initFields, ...currentStep });

  // const tProcess = { ...initFields, ...currentStep };
  // for (const v in step) {
  //   if (typeof tProcess[v] === "undefined") tProcess[v] = "";

  useEffect(() => {
    console.log("useeffect");
    const tStep = { ...initFields, ...currentStep };
    for (const v in step) {
      if (typeof tStep[v] === "undefined") tStep[v] = "";
    }
    setStep(tStep);
  }, [currentStep]);

  const dispatch = useDispatch();

  const editStep = () => {
    const newProcess = generateStepObject(step);
    dispatch(editProcessAction(newProcess, stepIdx));
  };

  const handleClearDataHeader = () =>
    setStep((p) => ({
      ...p,
      ...resetFields,
    }));

  const handleSwitch = (e) => {
    e.persist();
    const { ocr, ...rf } = resetFields;
    setStep((p) => ({
      ...p,
      [e.target.name]: e.target.checked,
      ...rf,
    }));
  };
  const handleTypeChange = (type) => (e) => {
    setStep((p) => ({
      ...p,
      [type]: e.target.value,
      ...(type === "_type" ? resetFields : {}),
    }));
  };

  const handleChange = (e) => {
    e.persist();
    setStep((p) => ({
      ...p,
      [e.target.name]: e.target.value,
      ...(e.target.typeChanged
        ? {
            dataEntry: "",
          }
        : {}),
    }));
  };

  const handleSubmit = () => {
    editStep(step);
    handleClose();
  };

  console.log(step);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Process Configuration</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box mb={1}>
          <SelectorInput
            value={useMemo(() => step._type, [step._type])}
            onChange={useCallback((e) => handleTypeChange("_type")(e), [])}
            options={types}
            placeholder="Process Type"
          />
        </Box>
        {step._type === "ScreenShot" && (
          <TypeScreenshot
            onSwitch={handleSwitch}
            value={step.ocr}
            variables={currentVariables}
            saveToVariable={step.saveToVariable}
            onChange={handleChange}
          />
        )}
        {step._type === "link" && (
          <TypeLink onChange={handleChange} value={step.link} />
        )}
        {step._type === "click" && (
          <TypeClick onChange={handleChange} value={step} />
        )}
        {step._type === "LoadData" && (
          <TypeLoadData
            onClearHeaderData={handleClearDataHeader}
            headers={currentHeaders}
            variables={currentVariables}
            onChange={handleChange}
            value={step}
            onSelectorChange={handleTypeChange("type")}
            inputTypes={inputTypes}
          />
        )}
        {step._type === "Extract Data" && (
          <TypeExtractData
            extractDataFields={extractDataFields}
            variables={currentVariables}
            extractField={step.variableField}
            variable={step.saveToVariable}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
