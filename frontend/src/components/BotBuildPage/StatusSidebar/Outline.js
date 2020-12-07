import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import {
  LinkRounded as LinkIcon,
  MouseRounded as MouseIcon,
  FolderRounded as LoadIcon,
  KeyboardHideRounded as PressedIcon,
  CameraAltRounded as CameraIcon,
} from "@material-ui/icons";

const typeIcons = {
  link: <LinkIcon />,
  click: <MouseIcon />,
  LoadData: <LoadIcon />,
  KeyBoard: <PressedIcon />,
  ScreenShot: <CameraIcon />,
};

const useStyles = makeStyles((theme) => ({
  step: {
    backgroundColor: "#26272D",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: theme.spacing(0.5),
    border: "2px solid rgba(0,0,0,0)",
    transition: ".2s",
    "&:hover": {
      border: "2px solid #3B93FF",
    },

    "&.active": {
      border: "2px solid #3B93FF",
      background: "rgba(105, 172, 255, 0.3)",
    },
  },
}));

export default (props) => {
  const classes = useStyles();

  return !props.steps.length ? (
    <Box textAlign="center">
      <Typography>No Steps to display</Typography>
    </Box>
  ) : (
    props.steps.map((step, idx) => (
      <Box
        onClick={() => props.selectStep(idx)}
        onMouseLeave={(e) => props.selectStep("")}
        className={`${classes.step} ${props.selectedStep === idx && "active"}`}
        key={step.id}
      >
        {typeIcons[step._type]}
        <Box display="flex" ml={2} alignItems="center">
          <Box mr={1}>
            <Typography variant="subtitle2">{idx + 1}.</Typography>
          </Box>
          <Typography variant="subtitle1">{step.title}</Typography>
        </Box>
      </Box>
    ))
  );
};
