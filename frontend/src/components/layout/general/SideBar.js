import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  FormatListNumberedRounded as BotsIcon,
  ImageAspectRatioRounded as TemplateIcon,
  CastForEducationRounded as LearnIcon,
  NotificationsRounded as NotificationsIcon,
  ExitToAppRounded as LogoutIcon,
  PlayCircleFilledRounded as RunIcon,
  SaveRounded as SaveIcon,
  CodeRounded as CodeIcon,
  SettingsRounded as SettingsIcon,
  Dashboard as DashboardIcon,
} from "@material-ui/icons";
import { ModalContext } from "../../../context/ModalContext";

import * as electron from "../../../electronScript";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, saveBot, updateErrors } from "../../../Store/actions";
import checkBot from "../../BotBuildPage/checkBot";
import logo from "../../../images/logo.png";
import { mapProcessesAndIdx } from "../../BotBuildPage/utils/grouping";

const links = [
  {
    name: "dashboard",
    location: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    name: "bots",
    location: "/bot-list",
    Icon: BotsIcon,
  },
  {
    name: "marketplace",
    Icon: TemplateIcon,
  },
  {
    name: "notifications",
    Icon: NotificationsIcon,
  },
  {
    name: "academy",
    Icon: LearnIcon,
  },
];

const General = () => {
  const history = useHistory();

  const handleLogout = () => history.push("/");
  return (
    <Drawer variant="permanent">
      <Box>
        <Box my={4} minWidth="220px" textAlign="center">
          <img src={logo} />
        </Box>
        {links.map(({ name, Icon, location }) => (
          <ListItem
            exact
            key={name}
            button
            component={NavLink}
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
          <ListItem button onClick={handleLogout}>
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

const BotSidebar = () => {
  const history = useHistory();
  const { setCurrentModal, setCurrentToastr } = useContext(ModalContext);
  const { saved, errors, process, groups: tGroups, ...bot } = useSelector(
    (state) => state
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const openGenerateCodeModal = () =>
    setCurrentModal({
      name: "GenerateCodeModal",
    });

  const openBotConfigModal = () =>
    setCurrentModal({
      name: "BotConfigModal",
    });

  const handleSaveBot = async () => {
    const errors = checkBot(process);
    if (Object.keys(errors).length) {
      dispatch(updateErrors(errors));
      return setCurrentToastr({
        msg: "Could not save, please fix the errors",
      });
    }
    setLoading(true);
    const { tGroups: groups, groupedProcesses } = mapProcessesAndIdx(
      process,
      tGroups
    );

    // const gp = {
    //   processId1: true,
    //   processId3: true,
    //   processId6: true,
    // }

    console.log({ groupedProcesses });

    await electron.ipcRenderer.send("update-bot-process", bot.botName, process);
    await electron.ipcRenderer.send("update-bot", bot.botName, {
      ...bot,
      groups,
    });
    setLoading(false);
    dispatch(saveBot());
    setCurrentToastr({
      msg: "Bot saved!",
      success: true,
    });
  };

  const handleRunBot = async () => {
    await electron.ipcRenderer.send(electron.startBotChannel, bot.botName);
  };

  const exitToMain = async () => {
    dispatch(clearAll());
    history.push("/bot-list");
  };

  return (
    <Drawer variant="permanent">
      <Box>
        <Box my={4} minWidth="220px" textAlign="center">
          <img src={logo} />
        </Box>
        <ListItem button onClick={handleRunBot}>
          <ListItemIcon>
            <RunIcon />
          </ListItemIcon>
          <ListItemText>Run bot</ListItemText>
        </ListItem>
        <ListItem button disabled={loading} onClick={handleSaveBot}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText>Save bot</ListItemText>
        </ListItem>
        <ListItem button onClick={openGenerateCodeModal}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText>Generate Code</ListItemText>
        </ListItem>
        <ListItem button onClick={openBotConfigModal}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Configure</ListItemText>
        </ListItem>
        <ListItem button onClick={exitToMain}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Exit</ListItemText>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default (props) => {
  const { pathname } = useLocation();
  return pathname === "/" ? null : pathname === "/build" ? (
    <BotSidebar />
  ) : (
    <General />
  );
};
