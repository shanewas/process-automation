import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon, KeyboardArrowLeft } from "@material-ui/icons";
import SelectorInput from "../../layout/input/SelectorInput";

const initBot = { name: "", category: "" };

export default ({ open, handleClose, bots, addBot, saveExisting }) => {
  const [saveAs, setSaveAs] = useState("");
  const [bot, setBot] = useState(initBot);
  const [existing, setExisting] = useState("");
  const [error, setError] = useState({});

  const handleChange = (e) => {
    e.persist();
    setBot((b) => ({ ...b, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setError({});
    if (saveAs === "existing") {
      if (!existing) return setError({ existing: "Required" });
      saveExisting(existing);
      handleClose();
    } else {
      if (!bot.name || !bot.category)
        return setError({ name: "Required", category: "Required" });
      addBot(bot);
      handleClose();
    }
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {!!saveAs && (
              <IconButton onClick={() => setSaveAs("")}>
                <KeyboardArrowLeft size={15} />
              </IconButton>
            )}
            Save Bot
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {!saveAs && (
          <Grid container justify="space-around">
            <Grid item>
              <Button
                onClick={() => setSaveAs("existing")}
                variant="outlined"
                color="primary"
              >
                Select existing bot
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setSaveAs("new")}
                variant="contained"
                disableElevation
                color="primary"
              >
                Create new
              </Button>
            </Grid>
          </Grid>
        )}

        {saveAs === "existing" && (
          <SelectorInput
            value={existing}
            onChange={(e) => setExisting(e.target.value)}
            options={bots}
            error={error.existing}
            placeholder="Select Bot"
          />
        )}
        {saveAs === "new" && (
          <Grid container>
            <Grid item>
              <TextField
                style={{ marginRight: "10px" }}
                variant="outlined"
                label="Bot name"
                value={bot.name}
                error={!!error.name}
                helperText={error.name}
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Bot Category"
                error={!!error.category}
                helperText={error.category}
                name="category"
                value={bot.category}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {!!saveAs && (
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Apply
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
