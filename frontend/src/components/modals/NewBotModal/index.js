import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Grid, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newBot } from "../../../Store/actions";
import * as electron from "../../../electronScript";

export default ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [botName, setBotName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log({ history, location });

  const createBot = async () => {
    setLoading(true);
    const tBots = await electron.ipcRenderer.invoke("bots");
    if (
      tBots.map((b) => b.botName.toLowerCase()).includes(botName.toLowerCase())
    ) {
      setLoading(false);
      return setError(true);
    }
    await electron.ipcRenderer.invoke("add-bot", botName.trim(), "");
    dispatch(newBot(botName.trim()));
    handleClose();
    history.push("/build");
  };

  const gotoMarketpalce = () => {
    handleClose();
    history.push("/marketplace");
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
        {error && (
          <Box color="red" mt={2}>
            <Typography variant="body2">
              A bot with the same name exists. Choose a different name.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Box mr={2}>
          <Button
            disabled={loading}
            onClick={gotoMarketpalce}
            variant="outlined"
          >
            Use a template
          </Button>
        </Box>
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={createBot}
        >
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
