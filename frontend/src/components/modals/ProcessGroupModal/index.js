import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  makeStyles,
  IconButton,
  Box,
} from "@material-ui/core";

import { Close as CloseIcon, Timer as TimerIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  processGroup: {
    border: "1px solid #c4c6c8",
    borderRadius: "5px",
    color: "#c4c6c8",
    textAlign: "center",
    padding: "6px",
    margin: theme.spacing(0.5),
    fontSize: "14.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      color: "#363636",
      borderColor: "#363636",
    },
  },
  pgWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  color: {
    height: "20px",
    width: "20px",
    borderRadius: "100px",
    backgroundColor: "red",
  },
}));

export default ({ open, handleClose }) => {
  const classes = useStyles();
  const colors = ["#61BD4F", "#F2D600", "#FF9F1A", "#F56E5A", "#E195FE"];

  const processGroups = [
    {
      id: 1,
      name: "Using Screenshot",
      processes: [1, 2, 3, 4],
      iteration: 2,
      color: 1,
    },
    {
      id: 2,
      name: "Logging in",
      processes: [1],
      iteration: 3,
      color: 2,
    },
    {
      id: 3,
      name: "Saving Doc",
      processes: [1, 2, 3],
      iteration: 2,
      color: 3,
    },
    {
      id: 4,
      name: "Saving Files",
      processes: [1, 2, 3, 4],
      iteration: 2,
      color: 4,
    },
  ];
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Process groups</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ fontSize: "16px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.pgWrapper}>
          {processGroups.map((pg) => (
            <Box key={pg.id} className={classes.processGroup}>
              <Box
                mr={2}
                className={classes.color}
                style={{ backgroundColor: colors[pg.color] }}
              ></Box>
              <Box mr={2}>{pg.id}</Box>
              {pg.name}
              <Box ml={2}>
                <TimerIcon size={20} /> {pg.iteration}
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button disableElevation variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
