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

export default ({ open, handleClose, saveData }) => {
  const [data, setData] = useState("");
  const handleDataChange = (e) => setData(e.target.value);
  const onSave = () => {
    saveData(data);
    handleClose();
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Manual Data Entry</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleDataChange}
          value={data}
          variant="outlined"
          placeholder="Data"
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
