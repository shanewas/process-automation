import React from "react";
import {
  Drawer,
  makeStyles,
  Box,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#C0392B",
    color: "#fff",
    width: "320px",
  },
  warningsTitle: {
    textTransform: "uppercase",
  },
  warning: {
    backgroundColor: "#96281B",
  },
  fixBtn: {
    backgroundColor: "#000",
    color: "#fff",
    textTransform: "capitalize",

    "&:hover": {
      backgroundColor: "#000",
    },
  },
});
export default ({
  open,
  warnings: unstructWarnings,
  hideWarnings,
  onWarningHover,
  onWarningHoverOut,
  openProcessConfigModal,
}) => {
  const warnings = [];
  for (const processId in unstructWarnings)
    warnings.push({ processId, ...unstructWarnings[processId] });

  const classes = useStyles();
  return (
    <Drawer
      variant="persistent"
      classes={{ paper: classes.paper }}
      anchor="right"
      open={open}
    >
      <Box display="flex" justifyContent="space-between" pt={2} pb={2} mx={2}>
        <Typography className={classes.warningsTitle}>Warnings</Typography>
        <IconButton
          style={{ color: "#fff" }}
          onClick={hideWarnings}
          size="small"
        >
          <Cancel />
        </IconButton>
      </Box>
      {warnings.map((warning) => (
        <Box
          mx={2}
          mb={1}
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={classes.warning}
          key={warning.processId}
          onMouseOver={() => onWarningHover(warning.processId)}
          onMouseOut={onWarningHoverOut}
        >
          <Box>
            <Typography variant="caption">
              Process ID: {warning.processId}
            </Typography>
            <br />
            <Typography variant="caption">
              Process Type: {warning.type}
            </Typography>
            <Typography variant="subtitle2">{warning.message}</Typography>
          </Box>
          <Button
            onClick={() => openProcessConfigModal(warning.processId)}
            className={classes.fixBtn}
          >
            Fix it
          </Button>
        </Box>
      ))}
    </Drawer>
  );
};
