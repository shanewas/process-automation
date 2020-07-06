import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";

const bots = [
  {
    botName: "deepu",
  },
  {
    botName: "osum",
  },
];

const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    alignItems: "center",

    "& > *:first-child": {
      marginRight: "10px",
    },
  },
  existing: {
    backgroundColor: "#eee",
  },
});

const initBot = { name: "", category: "" };

export default ({ open, handleClose }) => {
  const classes = useStyles();
  const [bot, setBot] = useState(initBot);
  const [newBot, setNewBot] = useState(false);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Save Bot</DialogTitle>
      <DialogContent>
        <Select
          style={{ width: "150px" }}
          value={bot.name}
          displayEmpty
          renderValue={() => "Select Bot"}
        >
          <MenuItem aria-label="None" value="new" divider>
            New Bot
          </MenuItem>
          <MenuItem disabled aria-label="None" value="">
            Existing Bots
          </MenuItem>
          {bots.map((bot) => (
            <MenuItem key={bot.botName} value={bot.botName}>
              {bot.botName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          //   onChange={handleInputChange}
          placeholder="Bot Name"
          name="name"
          value={bot.name}
          placeholder="Bot Name"
        />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
