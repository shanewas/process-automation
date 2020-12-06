import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  FilledInput,
  Button,
  makeStyles,
} from "@material-ui/core";
import { KeyboardRounded as KeyboardIcon } from "@material-ui/icons";
import StatusSidebar from "./StatusSidebar";
import StepsFlowchart from "./StepsFlowchart";
import * as electron from "../../electronScript";
import { useDispatch, useSelector } from "react-redux";
import { newProcessAction } from "../../Store/actions";
import shortId from "shortid";
import generateStepObject from "./utils/generateStepObject";

const useStyles = makeStyles((theme) => ({
  startBtn: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    height: "55px",
    width: "120px",
  },
}));

export default (props) => {
  const classes = useStyles();
  const [selectedVariable, setSelectedVariable] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.process);

  useEffect(() => {
    electron.ipcRenderer.on(electron.ProcessLinkChannel, (e, content) => {
      const process = { ...content, id: shortId() };
      dispatch(newProcessAction(generateStepObject(process)));

      return electron.ipcRenderer.removeAllListeners(
        electron.ProcessLinkChannel
      );
    });
  }, [steps]);

  const startRecording = () => {
    electron.send(electron.SearchLinkChannel, url);
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
            <Typography variant="h4">New Bot</Typography>
          </Box>
          <IconButton>
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
            ß
            selectedVariable={selectedVariable}
          />
        </Box>
      </Grid>
      <StatusSidebar
        selectStep={setSelectedStep}
        selectedStep={selectedStep}
        steps={steps}
        selectedVariable={selectedVariable}
        selectVariable={setSelectedVariable}
      />
    </Grid>
  );
};
