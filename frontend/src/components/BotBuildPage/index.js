import React from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  FilledInput,
  Button,
  makeStyles,
} from "@material-ui/core";
import { KeyboardRounded as KeyboardIcon } from "@material-ui/icons";
import StepCard from "./StepCard";

const useStyles = makeStyles((theme) => ({
  startBtn: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    height: "55px",
    width: "120px",
  },
}));

const steps = [
  {
    id: 1,
    type: "Link",
    text: "https://google.com",
  },
  {
    id: 2,
    type: "Conditions",
    text: "https://google.com",
  },
  {
    id: 3,
    type: "Clicked",
    text: "Clicke on a button",
  },
  {
    id: 4,
    type: "Clicked",
    text: "Clicked on a button",
  },
];

export default (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={8}>
        <Box
          mb={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="flex-end">
            <Box mr={1}>
              <Typography variant="h6">Bots / </Typography>
            </Box>
            <Typography variant="h4">New Bot</Typography>
          </Box>
          <IconButton>
            <KeyboardIcon />
          </IconButton>
        </Box>
        <Box mb={6} display="flex" alignItems="center">
          <FilledInput disableUnderline fullWidth placeholder="Enter URL" />
          <Button
            className={classes.startBtn}
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        </Box>
        <Box>
          {steps.map((step) => (
            <StepCard key={step.id} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
