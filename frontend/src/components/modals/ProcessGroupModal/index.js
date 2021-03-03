import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Check as CheckIcon } from "@material-ui/icons";

const colors = ["#61BD4F", "#F2D600", "#FF9F1A", "#F56E5A", "#E195FE"];
const clrObj = {};
for (const c in colors)
  clrObj[`&.active&-${c}::before`] = { borderColor: colors[c] };

const useStyles = makeStyles({
  color: {
    height: "30px",
    width: "30px",
    borderRadius: "50px",
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",

    "&.active::before": {
      background: "none",
      borderRadius: "50px",
      border: "2px solid #fff",
      content: "''",
      display: "block",
      position: "absolute",
      top: "-4px",
      left: "-4px",
      right: "-4px",
      bottom: "-4px",
    },
    ...clrObj,
  },
});

const ProcessGroupModal = (props) => {
  const [groupColor, setGroupColor] = useState("");
  const classes = useStyles();

  return (
    <Dialog fullWidth open={true}>
      <DialogTitle>
        <Box px={2} pt={2} display="flex" justifyContent="space-between">
          Create new group
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon size={16} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box p={2}>
          <TextField fullWidth label="Group name" />
          <Box display="flex" mt={5}>
            <Typography variant="h5">Color:</Typography>
            <Box ml={2} display="flex">
              {colors.map((clr, idx) => (
                <Box
                  key={clr}
                  onClick={() => setGroupColor(clr)}
                  className={`${classes.color} ${
                    groupColor === clr ? `active ${classes.color}-${idx}` : ""
                  }`}
                  style={{ backgroundColor: clr }}
                >
                  {groupColor === clr && <CheckIcon />}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default ProcessGroupModal;
