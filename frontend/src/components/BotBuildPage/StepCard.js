import React from "react";
import {
  makeStyles,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  MoreHoriz as MenuIcon,
  ErrorOutlineOutlined as ErrorIcon,
} from "@material-ui/icons";
import processTypes from "./utils/processTypes";

const useStyles = makeStyles((theme) => ({
  stepWrapper: (props) => ({
    "&-step": {
      width: "80%",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      transition: ".3s",
      cursor: "pointer",
      border: ".8px solid rgba(0,0,0,0)",
      borderColor: props.selected ? props.color : "rgba(0,0,0,0)",
      transform: props.selected ? "scale(1.05)" : "scale(1)",
      position: "relative",
      overflow: "hidden",
    },

    "&-dataEntry": {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "-10px",
      right: "10px",
      minWidth: "50px",
      textAlign: "center",
      backgroundColor: props.color,
      color: "white",
      padding: "4px 8px",
      borderRadius: "20px",
      opacity: "0",
      transition: ".3s",
      fontWeight: 700,
      fontSize: "16px",
      fontFamily: theme.typography.fontFamily,
    },

    "&.active &-indicator": {
      backgroundColor: props.color,
    },
    "&.active &-step": {
      border: `.8px solid ${props.color}`,
    },

    "&-indicator": {
      height: "20px",
      width: "20px",
      borderRadius: "50px",
      border: `1px solid ${props.color}`,
      transition: ".3s",
    },

    "&:hover &-dataEntry": {
      top: "15%",
      opacity: "1",
    },
    "&:hover &-step": {
      border: `.8px solid ${props.color}`,
    },

    "&:hover &-indicator": {
      background: props.color,
      boxShadow: `0px 1px 10px ${props.color}`,
    },
  }),

  error: {
    padding: "4px 8px",
    fontSize: "15px",
    position: "absolute",
    left: "50%",
    top: "0",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(227,82,67,.1)",
    color: "#FF2424",
    display: "flex",
    alignItems: "center",

    "& > svg": {
      width: "18px",
      height: "18px",
      color: "#FF2424",
      marginRight: "5px",
    },
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(2),
    height: "50px",
    width: "50px",
    color: (props) => props.color,
    borderRadius: "50%",
    background: (props) => props.bgcolor,
  },
  associatedWithVariable: {
    position: "absolute",
    // zIndex: -1,
    bottom: "-50px",
    right: "-200px",
    border: "1px solid #60CFBA",
    color: "#60CFBA",
    boxShadow: "none",
    fontFamily: "Fira Code",
    textTransform: "uppercase",
    fontSize: "14px",
    borderRadius: "8px 0 8px 0 ",
    padding: "4px 10px",
    fontWeight: 600,
    transition: ".2s",

    "&.active": {
      bottom: "0",
      right: "0",
    },

    "&.saving": {
      backgroundColor: theme.palette.background.paper,

      backgroundColor: "#60CFBA",
      boxShadow: "10px 2px 25px rgba(96, 207, 186, 0.5)",
      color: "#000",
    },
  },
}));

export default (props) => {
  const isUsingVariable =
    props.entryType === "variable" &&
    props.dataEntry === props.selectedVariable;
  const isSavingToVariable =
    props.saveToVariable && props.saveToVariable === props.selectedVariable;
  const isUsingHeader =
    props.entryType === "dataHeader" &&
    props.dataEntry === props.selectedHeader;

  console.log({ selectedHeader: props.selectedHeader, isUsingHeader });
  const { color, bgcolor, Icon } = processTypes[props._type];
  const classes = useStyles({
    selected: props.selected,
    color,
    bgcolor,
  });

  return (
    <Box
      mb={3}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      className={`${classes.stepWrapper} ${
        isUsingHeader || props.selectedErrorStep ? "active" : ""
      }`}
    >
      <Box className={`${classes.stepWrapper}-indicator`}> </Box>
      <Box
        onClick={() => props.selectStep(props.idx)}
        onMouseLeave={(e) => props.selectStep("")}
        className={`${classes.stepWrapper}-step`}
      >
        <Box className={classes.icon}>{Icon}</Box>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{props.title}</Typography>
          </Box>
          <Typography>{props.text}</Typography>
        </Box>
        {props.haveError && (
          <Tooltip title={props.haveError}>
            <Box className={classes.error}>
              <ErrorIcon />
              Error
            </Box>
          </Tooltip>
        )}

        <Box
          className={`${classes.associatedWithVariable} ${
            isUsingVariable ? "active" : ""
          } `}
        >
          Using variable Value
        </Box>
        <Box
          className={`${classes.associatedWithVariable} ${
            isSavingToVariable ? "active saving" : ""
          } `}
        >
          Saving to variable
        </Box>
        {props.dataEntry && (
          <Box className={`${classes.stepWrapper}-dataEntry`}>
            Value:{" "}
            <Box
              display="inline-block"
              overflow="hidden"
              maxWidth="80px"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontWeight={700}
              mx={0.5}
            >
              {props.dataEntry}
            </Box>{" "}
            <i>({props.entryType})</i>
          </Box>
        )}
      </Box>
      <IconButton onClick={props.openMenu}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};
