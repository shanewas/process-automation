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
  const [state, setState] = useState({
    bots: [],
    botSearch: "",
    sortDesc: false,
  });
  const dispatch = useDispatch();

  const fetchBots = async () => {
    const bots = await electron.ipcRenderer.invoke("bots");
    setState((o) => ({ ...o, bots }));
  };

  const exportBot = (botName) => {
    electron.ipcRenderer.send(electron.exportBot, botName);
  };

  useEffect(() => {
    fetchBots();
  });

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
          {state.bots.map((flow) => (
            <TableRow hover className={classes.tr} key={flow.id}>
              <TableCell>{flow.name}</TableCell>
              <TableCell>{flow.lastActive}</TableCell>
              <TableCell align="right" className={classes.actions}>
                <Tooltip title="Run bot">
                  <IconButton size="small">
                    <RunIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit bot">
                  <IconButton size="small">
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
