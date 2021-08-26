import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { DragIndicator as DragIcon } from "@material-ui/icons";
import processTypes from "../utils/processTypes";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  step: {
    width: "100%",
    backgroundColor: "#26272D",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),

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

const OutlineItem = ({ step, index, ...props }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={`${step.id}`} index={index}>
      {(provided) => (
        <Box
          display="flex"
          key={step.id}
          alignItems="center"
          mb={2}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <span {...provided.dragHandleProps}>
            <DragIcon style={{ marginRight: "10px" }} />
          </span>
          <Box
            onClick={() => props.selectSteps((o) => [...o, step.id])}
            onMouseLeave={(e) =>
              props.selectSteps((o) => o.filter((o) => o !== step.id))
            }
            className={`${classes.step} ${
              props.selectedSteps.includes(step.id) && "active"
            }`}
          >
            {processTypes[step._type]?.Icon}
            <Box display="flex" ml={2} alignItems="center">
              <Box mr={1}>
                <Typography variant="subtitle2">{index + 1}.</Typography>
              </Box>
              <Typography variant="subtitle1">{step.title}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default OutlineItem;
