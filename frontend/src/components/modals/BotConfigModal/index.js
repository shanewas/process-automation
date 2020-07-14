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
  const [errors, setErrors] = useState({});
  console.log(errors);
  const onSave = () => {
    if (isNaN(iteration) || iteration <= 0)
      return setErrors({ iteration: "Must be a number and greater than 0" });
    saveIteration(Number(iteration));
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
          error={!!errors.iteration}
          helperText={errors.iteration}
          label="Bot Iteration"
          onChange={handleIterationChange}
          value={iteration}
          variant="outlined"
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
