import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import Button from "react-bootstrap/Button";

export default ({ open, handleClose, botIteration, saveIteration }) => {
  const [iteration, setIteration] = useState(botIteration);
  const handleIterationChange = (e) => setIteration(e.target.value);
  const onSave = () => {
    saveIteration(iteration);
    handleClose();
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Bot Configuration</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleIterationChange}
          value={iteration}
          variant="outlined"
          placeholder="Bot Iteration"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} variant="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
