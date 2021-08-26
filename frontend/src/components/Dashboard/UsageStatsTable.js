import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: "#0D0D0D",
  },
  thCell: {
    fontSize: "18px",
    fontWeight: 700,
  },
  tr: {
    "& > .MuiTableCell-root": {
      fontSize: "18px !important",
      fontWeight: 400,
      color: "rgba(255,255,255,.6)",

      "&:hover": {
        color: "#fff",
      },
    },
  },
  badge: {
    padding: "7px 15px",
    backgroundColor: "#eee",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#000",
    display: "inline-block",
    fontWeight: 700,

    "&-Running": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&-Paused": {
      backgroundColor: "#FFD966",
    },
  },
}));

const usageStats = [
  {
    id: 1,
    user: "#SO-0003",
    machine: "Gasper Antunes",
    status: "Running",
    folder: "Sarvodaya",
  },
  {
    id: 2,
    user: "#SO-0004",
    machine: "Peace Borg",
    status: "Paused",
    folder: "Sarvodaya",
  },
  {
    id: 3,
    user: "#SO-0004",
    machine: "Raaga",
    status: "Paused",
    folder: "Sarvodaya",
  },
];

export default (props) => {
  const classes = useStyles();

  return (
    <>
      <Box mb={2}>
        <Typography variant="h6">Usage Statistics</Typography>
      </Box>
      <Box bgcolor="background.paper">
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.thCell}>User</TableCell>
              <TableCell className={classes.thCell}>Machine</TableCell>
              <TableCell className={classes.thCell}>Status</TableCell>
              <TableCell align="center" className={classes.thCell}>
                Folder
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usageStats.map((us) => (
              <TableRow hover className={classes.tr} key={us.id}>
                <TableCell>{us.user}</TableCell>
                <TableCell>{us.machine}</TableCell>
                <TableCell>
                  <Box
                    className={`${classes.badge} ${classes.badge}-${us.status}`}
                  >
                    {us.status}{" "}
                  </Box>
                </TableCell>
                <TableCell align="center">{us.folder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
