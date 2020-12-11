import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Button,
  Box,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateBot } from "../../../Store/actions";

export default ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const {
    botName: botname,
    botIteration: botiteration,
  } = useSelector(({ botName, botIteration }) => ({ botName, botIteration }));

  const [botName, setBotName] = useState(botname);
  const [botIteration, setBotIteration] = useState(botiteration);
  const [errors, setErrors] = useState({});

  const handleUpdateBot = () => {
    if (!botName || !botName.trim)
      return setErrors({ botName: "Field required." });

    if (isNaN(botIteration) || botIteration <= 0)
      return setErrors({ botIteration: "Must be a number and greater than 0" });

    dispatch(updateBot({ botName, botIteration }));
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
        <Box mb={4}>
          <TextField
            error={!!errors.botName}
            helperText={errors.botName}
            label="Bot name"
            onChange={(e) => setBotName(e.target.value)}
            value={botName}
            variant="outlined"
            fullWidth
          />
        </Box>
        <TextField
          error={!!errors.botIteration}
          helperText={errors.botIteration}
          label="Bot Iteration"
          onChange={(e) => setBotIteration(e.target.value)}
          value={botIteration}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleUpdateBot}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
