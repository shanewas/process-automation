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
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateBot } from "../../../Store/actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& > *": {
      marginBottom: theme.spacing(4),
    },
  },
}));

export default ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    botName,
    botIteration,
    socket,
    ip,
    port,
    browserAgent = "",
  } = useSelector(
    ({ botName, botIteration, proxy, socket, ip, port, browserAgent }) => ({
      botName,
      botIteration,
      proxy,
      socket,
      ip,
      port,
      browserAgent,
    })
  );

  const [botConfig, setBotconfig] = useState({
    botName,
    botIteration,
    socket,
    ip,
    port,
    browserAgent,
  });

  const handleChange = (e) => {
    e.persist();
    setBotconfig((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
  };

  const [errors, setErrors] = useState({});

  const handleUpdateBot = () => {
    if (!botConfig.botName || !botConfig.botName.trim)
      return setErrors({ botName: "Field required." });

    if (isNaN(botConfig.botIteration) || botConfig.botIteration <= 0)
      return setErrors({ botIteration: "Must be a number and greater than 0" });

    dispatch(updateBot(botConfig));
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
      <DialogContent className={classes.wrapper}>
        <TextField
          disabled
          error={!!errors.botName}
          helperText={errors.botName}
          label="Bot name"
          onChange={handleChange}
          value={botConfig.botName}
          name="botName"
          variant="outlined"
          fullWidth
        />

        <TextField
          error={!!errors.botIteration}
          helperText={errors.botIteration}
          label="Bot Iteration"
          onChange={handleChange}
          value={botConfig.botIteration}
          name="botIteration"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Socket"
          onChange={handleChange}
          value={botConfig.socket}
          name="socket"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Ip"
          onChange={handleChange}
          value={botConfig.ip}
          name="ip"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Port"
          onChange={handleChange}
          value={botConfig.port}
          name="port"
          variant="outlined"
          fullWidth
        />
        <Select
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={botConfig.browserAgent}
          name="browserAgent"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Browser Agent
          </MenuItem>
          <MenuItem value="Chrome">Chrome</MenuItem>
          <MenuItem value="Mozilla">Mozilla</MenuItem>
          <MenuItem value="Safari">Safari</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleUpdateBot}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
