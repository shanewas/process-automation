import React, { useState } from "react";
import shortId from "shortid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Box,
  Grid,
  Button,
  Chip,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  chipsContainer: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default ({
  open,
  handleClose,
  variables: currentVariables = [],
  saveVariables,
}) => {
  console.log({ currentVariables });
  const classes = useStyles();
  const [variables, setVariables] = useState(currentVariables);
  const [variableName, setVariableName] = useState("");
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");

  const handleAddVariable = () => {
    const chk = variables.filter(
      (v) => v.name.toLowerCase() === variableName.toLowerCase()
    );
    if (chk.length) return setError("Duplicate variable Name");
    const variable = {
      id: shortId(),
      name: variableName,
      value: "",
      assignors: [],
      usedBy: [],
    };
    setVariables((v) => [...v, variable]);
    setChanged(true);
    setVariableName("");
    setError("");
  };

  const handleDeleteVariable = (tVar) => {
    setVariables((v) => v.filter((tv) => tv.id !== tVar.id));
    setChanged(true);
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Variables</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm>
            <TextField
              error={!!error}
              helperText={error}
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm>
            <Button
              onClick={handleAddVariable}
              variant="contained"
              disableElevation
              color="primary"
              disabled={!variableName}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Box mt={2} className={classes.chipsContainer}>
          {variables.map((v) => {
            return (
              <Chip
                color={
                  v.assignors.length || v.usedBy.length ? "primary" : "default"
                }
                key={v.id}
                label={v.name}
                onDelete={
                  v.assignors.length || v.usedBy.length
                    ? null
                    : () => handleDeleteVariable(v)
                }
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!changed}
          color="primary"
          variant="contained"
          disableElevation
          onClick={() => {
            saveVariables(variables);
            handleClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
