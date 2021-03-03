import React, { useState } from "react";
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  CropFreeRounded as OutlineIcon,
  InsertDriveFileRounded as DatasetIcon,
  ErrorRounded as ErrorsIcon,
  CodeRounded as VariablesIcon,
  ViewModule as GroupIcon,
} from "@material-ui/icons";
import Outline from "./Outline";
import Dataset from "./Dataset";
import Errors from "./Errors";
import Groups from "./Groups";

import Variables from "./Variables";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "26%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#121212",
  },
  buttonsWrapper: {
    backgroundColor: "#000003",
    width: "90px",
    height: "100%",
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: "1px solid #373737",

    "& > *": {
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
      backgroundColor: "#373737",

      "&.active": {
        backgroundColor: "#136BF5",
        color: "#fff",

        "&:hover": {
          backgroundColor: "#136BF5",
        },
      },

      "&:hover": {
        backgroundColor: "#373737",
      },
    },
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "18px",
    fontWeight: 700,
  },
}));

const Screens = {
  Outline,
  Dataset,
  Errors,
  Variables,
  Groups,
};

const CustomPulseBadge = withStyles({
  badge: {
    animation: "$pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0px rgba(244,67,54, 0.4)",
    },
    "100%": {
      boxShadow: "0 0 0 20px rgba(244,67,54, 0.0)",
    },
  },
})(Badge);

const ErrorBadge = ({ errors }) => (
  <CustomPulseBadge color="error" variant="dot" invisible={!errors}>
    <ErrorsIcon />
  </CustomPulseBadge>
);

const links = [
  {
    text: "Outline",
    Icon: OutlineIcon,
  },
  {
    text: "Dataset",
    Icon: DatasetIcon,
  },
  {
    text: "Errors",
    Icon: ErrorBadge,
  },
  {
    text: "Variables",
    Icon: VariablesIcon,
  },
  {
    text: "Groups",
    Icon: GroupIcon,
  },
];

export default (props) => {
  const [screen, setScreen] = useState("Outline");
  const errors = useSelector((state) => state.errors);
  const classes = useStyles();

  const Screen = Screens[screen];

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      classes={{ paper: classes.wrapper }}
    >
      <Box className={classes.buttonsWrapper}>
        {links.map(({ text, Icon }) => (
          <Tooltip arrow placement="left" title={text} key={text}>
            <IconButton
              disableRipple
              className={screen === text ? "active" : ""}
              onClick={() => setScreen(text)}
            >
              <Icon errors={Object.keys(errors).length} />
            </IconButton>
          </Tooltip>
        ))}
      </Box>
      <Box p={3.5} width="100%">
        <Box mb={3}>
          <Typography className={classes.title}>{screen}</Typography>
        </Box>
        <Screen {...props} />
      </Box>
    </Drawer>
  );
};
