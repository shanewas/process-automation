import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

const BotDeleteModal = ({ open, handleClose, bot, onBotDelete }) => {
  const onDelete = () => {
    onBotDelete();
    handleClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Delete Bot</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ fontSize: "16px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete <b>{bot.botName}</b>?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BotDeleteModal;
