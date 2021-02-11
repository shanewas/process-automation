import React from "react";
import { Box, Typography } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import OutlineItem from "./OutlineItem";

// const typeIcons = {
//   link: <LinkIcon />,
//   click: <MouseIcon />,
//   LoadData: <LoadIcon />,
//   KeyBoard: <PressedIcon />,
//   ScreenShot: <CameraIcon />,
// };

export default (props) => {
  return !props.steps.length ? (
    <Box textAlign="center">
      <Typography>No Steps to display</Typography>
    </Box>
  ) : (
    <DragDropContext onDragEnd={props.handleProcessOrderChange}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {props.steps.map((step, index) => (
              <OutlineItem key={step.id} step={step} {...props} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
