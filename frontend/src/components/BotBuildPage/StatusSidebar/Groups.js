import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default (props) => {
  return (
    <Box>
      <Button fullWidth variant="contained" color="primary">
        Create new
      </Button>
    </Box>
  );
};
