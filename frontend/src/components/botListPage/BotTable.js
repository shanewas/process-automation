import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import {
  PlayCircleFilled as RunIcon,
  EditRounded as EditIcon,
  DeleteRounded as DeleteIcon,
  SaveAltRounded as ExportIcon,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import * as electron from "../../electronScript";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { loadBot } from "../../Store/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: "#191A21",
  },
  thCell: {
    fontSize: "18px",
    fontWeight: 700,
  },
  tr: {
    "& > .MuiTableCell-root": {
      fontSize: "17px !important",
    },
  },
  actions: {
    "& > *": {
      marginRight: theme.spacing(2),
    },
  },
}));

const bots = [
  {
    id: 1,
    name: "depender",
    lastActive: "1 month ago",
  },
  {
    id: 2,
    name: "Registeration",
    lastActive: "15 days ago",
  },
  {
    id: 3,
    name: "Captcha",
    lastActive: "1 month ago",
  },
];

export default (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    bots: [],
    botSearch: "",
    sortDesc: false,
  });
  const dispatch = useDispatch();

  const fetchBots = async () => {
    const bots = await electron.ipcRenderer.invoke("bots");
    console.log(bots);
    setState((o) => ({ ...o, bots }));
  };

  const exportBot = (botName) => {
    electron.ipcRenderer.send(electron.exportBot, botName);
  };

  const loadSavedBot = async (botName) => {
    const process =
      (await electron.ipcRenderer.invoke("get-process", botName)) || [];
    const {
      headers = [],
      variables = [],
      csvInfo = null,
      botIteration = 1,
    } = await electron.ipcRenderer.invoke("bot-name", botName);
    dispatch(
      loadBot({
        process,
        headers,
        variables,
        botName,
        csvInfo,
        botIteration,
      })
    );

    console.log({
      process,
      headers,
      variables,
      botName,
      csvInfo,
      botIteration,
    });
    history.push("/build");
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <Box bgcolor="background.paper">
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.thCell}>Name</TableCell>
            <TableCell className={classes.thCell}>Last Active</TableCell>
            <TableCell align="right" className={classes.thCell}>
              Functions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.bots.map((bot) => (
            <TableRow hover className={classes.tr} key={bot._id}>
              <TableCell>{bot.botName}</TableCell>
              <TableCell>{formatDistanceToNow(bot.lastActive)} ago</TableCell>
              <TableCell align="right" className={classes.actions}>
                <Tooltip title="Run bot">
                  <IconButton size="small">
                    <RunIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit bot">
                  <IconButton
                    size="small"
                    onClick={() => loadSavedBot(bot.botName)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete bot">
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export bot">
                  <IconButton size="small">
                    <ExportIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
