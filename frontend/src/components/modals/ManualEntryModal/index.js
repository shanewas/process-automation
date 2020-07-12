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

export default ({
  open,
  handleClose,
  dataEntry: currentDataEntry = "",
  saveDataEntry,
}) => {
  const [dataEntry, setDataEntry] = useState(currentDataEntry);
  const handleDataChange = (e) => setDataEntry(e.target.value);
  const onSave = () => {
    saveDataEntry(dataEntry);
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
          value={dataEntry}
          variant="outlined"
          placeholder="Data Entry"
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
