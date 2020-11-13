import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { PlayCircleFilledRounded as RunIcon } from "@material-ui/icons";

export default (props) => {
  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <RunIcon />
        </ListItemIcon>
        <ListItemText>Run Bot</ListItemText>
      </ListItem>
    </>
  );
};
