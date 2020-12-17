import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  FilledInput,
  Button,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core";
import { KeyboardRounded as KeyboardIcon } from "@material-ui/icons";
import StatusSidebar from "./StatusSidebar";
import StepsFlowchart from "./StepsFlowchart";
import * as electron from "../../electronScript";
import { useDispatch, useSelector } from "react-redux";
import { newProcessAction } from "../../Store/actions";
import shortId from "shortid";
import generateStepObject from "./utils/generateStepObject";
import { ModalContext } from "../../context/ModalContext";

const useStyles = makeStyles((theme) => ({
  startBtn: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    height: "55px",
    width: "120px",
  },
  saveStatus: {
    padding: "10px 25px",
    border: "1px solid #6AD9C4",
    borderColor: (props) => (props.saved ? "inherit" : "#FED47E"),
    borderRadius: "25px",
    color: (props) => (props.saved ? "#6AD9C4" : "#FED47E"),
    fontFamily: "Fira Code",
    fontWeight: 600,
    fontSize: "16px",
    display: "flex",
    alignItems: "center",

    "& > .circle": {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      backgroundColor: (props) => (props.saved ? "#6AD9C4" : "#FED47E"),
      marginRight: "10px",
    },
  },
}));

export default (props) => {
  const saved = useSelector((state) => state.saved);
  const classes = useStyles({ saved });
  const [selectedVariable, setSelectedVariable] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const [selectedHeader, setSelectedHeader] = useState("");
  const [errorStep, setErrorStep] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.process);
  const botName = useSelector((state) => state.botName);
  const { setCurrentModal } = useContext(ModalContext);

  const handleProcessLink = (e, content) => {
    const process = { ...content, id: shortId() };
    dispatch(newProcessAction(generateStepObject(process)));
  };

  useEffect(() => {
    electron.ipcRenderer.on(electron.ProcessLinkChannel, handleProcessLink);
    return () =>
      electron.ipcRenderer.removeAllListeners(electron.ProcessLinkChannel);
  }, []);

  const startRecording = () => {
    electron.send(electron.SearchLinkChannel, url);
  };

  const openShortcutModal = () => {
    setCurrentModal({
      name: "KeyboardShortcutsModal",
    });
  };
  return (
    <Grid container>
      <Grid item xs={8}>
        <Box
          mb={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="flex-end">
            <Box mr={1}>
              <Typography variant="h6">Bots / </Typography>
            </Box>
            <Typography variant="h4">{botName}</Typography>
            <Box ml={2} className={classes.saveStatus}>
              <Box className="circle" />
              {saved ? "Updated" : "Not Updated"}
            </Box>
          </Box>
          <IconButton onClick={openShortcutModal}>
            <KeyboardIcon />
          </IconButton>
        </Box>
        <Box mb={8} display="flex" alignItems="center">
          <FilledInput
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disableUnderline
            fullWidth
            placeholder="Enter URL"
          />
          <Button
            className={classes.startBtn}
            variant="contained"
            color="primary"
            onClick={startRecording}
          >
            Start
          </Button>
        </Box>
        <Box position="relative">
          <StepsFlowchart
            selectStep={setSelectedStep}
            selectedStep={selectedStep}
            steps={steps}
            selectedVariable={selectedVariable}
            selectedHeader={selectedHeader}
            errorStep={errorStep}
          />
        </Box>
      </Grid>
      <StatusSidebar
        selectStep={setSelectedStep}
        selectedStep={selectedStep}
        steps={steps}
        selectedVariable={selectedVariable}
        selectVariable={setSelectedVariable}
        selectedHeader={selectedHeader}
        selectHeader={setSelectedHeader}
        selectErrorStep={setErrorStep}
      />
    </Grid>
  );
};