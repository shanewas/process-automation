import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon, AddRounded as AddIcon } from "@material-ui/icons";

export default ({ open, handleClose }) => {
  const [saveToVariable, setsaveToVariable] = useState("");

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>New Variable</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={saveToVariable}
          label="Variable name"
          onChange={(e) => setsaveToVariable(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          <AddIcon />
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
