import React from "react";
import {
  Box,
  Button,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import {
  FormatListNumberedRounded as BotsIcon,
  ImageAspectRatioRounded as TemplateIcon,
  CastForEducationRounded as LearnIcon,
  NotificationsRounded as NotificationsIcon,
  ExitToAppRounded as LogoutIcon,
} from "@material-ui/icons";

const links = [
  {
    name: "bots",
    location: "/",
    Icon: BotsIcon,
  },
  {
    name: "templates",
    Icon: TemplateIcon,
  },
  {
    name: "notifications",
    Icon: NotificationsIcon,
  },
  {
    name: "learn",
    Icon: LearnIcon,
  },
];

export default (props) => {
  console.log(useLocation());
  return (
    <Drawer variant="permanent">
      <Box>
        <Box my={4} minWidth="220px" textAlign="center">
          <img src="/assets/images/logo.png" />
        </Box>
        {links.map(({ name, Icon, location }) => (
          <ListItem
            key={name}
            button
            component={Link}
            to={location ? location : name}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </ListItem>
        ))}
      </Box>
      <Box>
        <Box
          borderRadius="16px"
          mb={2}
          textAlign="center"
          bgcolor="background.default"
          mx={2}
          px={2}
          py={4}
        >
          <Typography>
            Got stuck? We are
            <br />
            here to help.
          </Typography>
          <Box mt={2}>
            <Button color="primary" variant="contained" disableElevation>
              Chat now
            </Button>
          </Box>
        </Box>
        <Box mb={1.5}>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};
