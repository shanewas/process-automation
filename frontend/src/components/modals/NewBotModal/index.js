import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@material-ui/core";
import { Grid, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newBot } from "../../../Store/actions";

export default ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [botName, setBotName] = useState("");
  console.log({ history, location });

  const createBot = () => {
    dispatch(newBot(botName));
    handleClose();
    history.push("/build");
  };

  const gotoTemplates = () => {
    handleClose();
    history.push("/templates");
  };
  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>New Bot</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setBotName(e.target.value)}
          fullWidth
          variant="outlined"
          label="Bot name"
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2}>
          <Button onClick={gotoTemplates} variant="outlined">
            Use a template
          </Button>
        </Box>
        <Button variant="contained" color="primary" onClick={createBot}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
