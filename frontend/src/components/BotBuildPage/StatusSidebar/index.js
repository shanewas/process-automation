import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  CropFreeRounded as OutlineIcon,
  InsertDriveFileRounded as DatasetIcon,
  ErrorRounded as ErrorsIcon,
  CodeRounded as VariablesIcon,
} from "@material-ui/icons";
import Outline from "./Outline";
import Dataset from "./Dataset";
import Errors from "./Errors";
import Variables from "./Variables";

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
};

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
    Icon: ErrorsIcon,
  },
  {
    text: "Variables",
    Icon: VariablesIcon,
  },
];

export default (props) => {
  const [screen, setScreen] = useState("Outline");
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
              <Icon />
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
