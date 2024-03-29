import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as electron from "../../../electronScript";
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
import TypeUpload from "./TypeUpload";
import TypeDownload from "./TypeDownload";
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
const types = [
  "LoadData",
  "link",
  "click",
  "ScreenShot",
  "Extract Data",
  "upload",
  "download",
];
const inputTypes = ["null", "radio", "password", "text", "checkbox", "email"];
const extractDataFields = ["xpath", "label", "placeholder", "value"];

const resetFields = {
  downloadPath: "",
  uploadPath: "",
  screenshotPath: "",
  ocrPath: "",
  variableField: "",
  saveToVariable: "",
  variableUsed: "",
  entryType: "manual",
  dataEntry: "",
  ocr: false,
  socket: "",
  ip: "",
  port: "",
  csvId: "",
};

export default ({ open, handleClose, stepIdx }) => {
  const { currentStep, currentVariables, csvs } = useSelector(
    ({ process, variables, csvs }) => ({
      currentStep: process[stepIdx],
      currentVariables: variables,
      csvs: csvs,
    })
  );
  const [step, setStep] = useState({ ...initFields, ...currentStep });

  // const tProcess = { ...initFields, ...currentStep };
  // for (const v in step) {
  //   if (typeof tProcess[v] === "undefined") tProcess[v] = "";

  useEffect(() => {
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
            csvId: "",
          }
        : {}),
    }));
  };

  const handleHeaderSelect = (e) => {
    e.persist();
    if (!e.target.value) return;
    const [csvId, header] = e.target.value.split("-header-");
    setStep((old) => ({ ...old, dataEntry: header, csvId }));
  };

  const handleSubmit = () => {
    editStep();
    handleClose();
  };

  const getUploadFolderPath = async () => {
    const folderPath = await electron.ipcRenderer.sendSync(
      electron.getUploadFolderPath
    );
    folderPath && setStep((o) => ({ ...o, uploadPath: folderPath }));
  };

  const getDownloadFolderPath = async () => {
    const folderPath = await electron.ipcRenderer.sendSync(
      electron.getDownloadFolderPath
    );
    folderPath && setStep((o) => ({ ...o, downloadPath: folderPath }));
  };

  const getScreenshotFolderPath = async () => {
    // change the electron func to fetch screenshotFolderPath instead
    const folderPath = await electron.ipcRenderer.sendSync(
      electron.getDownloadFolderPath
    );
    // console.log({ folderPath });
    folderPath && setStep((o) => ({ ...o, screenshotPath: folderPath }));
  };

  console.log({ step });

  // const getOcrFolderPath = async () => {
  //   // change the electron func to fetch ocr instead
  //   const folderPath = await electron.ipcRenderer.sendSync(
  //     electron.getDownloadFolderPath
  //   );
  //   folderPath && setStep((o) => ({ ...o, ocrPath: folderPath }));
  // };

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
            getScreenshotFolderPath={getScreenshotFolderPath}
            screenshotPath={step.screenshotPath}
            // getOcrFolderPath={getOcrFolderPath}
            // ocrPath={step.ocrPath}
          />
        )}
        {step._type === "link" && (
          <TypeLink
            onChange={handleChange}
            link={step.link}
            socket={step.socket}
            ip={step.ip}
            port={step.port}
          />
        )}
        {step._type === "click" && (
          <TypeClick onChange={handleChange} value={step} />
        )}
        {step._type === "LoadData" && (
          <TypeLoadData
            onSwitch={handleSwitch}
            onClearHeaderData={handleClearDataHeader}
            csvs={csvs}
            variables={currentVariables}
            onChange={handleChange}
            onHeaderChange={handleHeaderSelect}
            step={step}
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
        {step._type === "upload" && (
          <TypeUpload
            getUploadFolderPath={getUploadFolderPath}
            uploadPath={step.uploadPath}
            onChange={handleChange}
            xpath={step.xpath}
          />
        )}
        {step._type === "download" && (
          <TypeDownload
            getDownloadFolderPath={getDownloadFolderPath}
            downloadPath={step.downloadPath}
            onChange={handleChange}
            xpath={step.xpath}
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
