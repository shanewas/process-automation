import React, { useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Papa from "papaparse";
import { loadCsv, unlinkCsv } from "../../../Store/actions";
import { LinkOff as UnlinkIcon } from "@material-ui/icons";
import { ModalContext } from "../../../context/ModalContext";

import csvSelected from "../../../images/csv_colored.png";
import noCsv from "../../../images/csv.svg";

const useStyles = makeStyles((theme) => ({
  csvText: {
    whiteSpace: "nowrap",
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  header: {
    padding: "12px 16px",
    // border: `1px solid ${theme.palette.grey[600]}`,
    background: "#282828",
    cursor: "pointer",
    borderRadius: "4px",
    transition: ".2s",
    border: "2px solid rgba(0,0,0,0)",
    "&:hover": {
      border: "2px solid #3B93FF",
    },

    "&.active": {
      border: "2px solid #3B93FF",
      background: "rgba(105, 172, 255, 0.3)",
    },
  },
  headerText: {
    color: theme.palette.grey[400],
    fontSize: "15px",
    fontWeight: 700,
  },
  usedBy: {
    width: "25px",
    height: "auto",
    border: "1px solid #2ED3C5",
    color: "#2ED3C5",
    fontSize: "15px",
    fontWeight: 700,
    borderRadius: "4px",
    textAlign: "center",
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setCurrentToastr } = useContext(ModalContext);
  const { headers, csvInfo } = useSelector(({ headers, csvInfo }) => ({
    headers,
    csvInfo,
  }));

  const handleLoadCsv = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const headers = result.data[0];
        const csvInfo = {
          name: file.name,
          path: file.path,
          rowNumber: result.data.length,
        };
        console.log({ csvInfo });
        dispatch(
          loadCsv({
            headers,
            csvInfo,
          })
        );
      },
    });
  };

  const handleUnlinkCsv = () => {
    const isAnyStepConnected = headers.find((h) => !!h.usedBy.length);
    if (isAnyStepConnected)
      return setCurrentToastr({
        msg: "Cannot unlink as this CSV is under use.",
      });
    dispatch(unlinkCsv());
  };
  return (
    <>
      {csvInfo ? (
        <Box mt={2}>
          <Box
            p={2}
            border="1px solid #484848"
            borderRadius="5px"
            display="flex"
            alignItems="center"
          >
            <Box mr={2}>
              <img src={csvSelected} alt="Csv" />
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box className={classes.csvText}>
                <Tooltip title={csvInfo.name}>
                  <Typography variant="subtitle1">{csvInfo.name}</Typography>
                </Tooltip>
                <Tooltip title={csvInfo.path}>
                  <Typography variant="caption">{csvInfo.path}</Typography>
                </Tooltip>
              </Box>
              <Tooltip title="Unlink this CSV">
                <IconButton onClick={handleUnlinkCsv} size="small">
                  <UnlinkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {headers.map((header) => (
            <Box
              key={header.name}
              mt={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              onClick={() =>
                props.selectedHeader === header.name
                  ? props.selectHeader("")
                  : props.selectHeader(header.name)
              }
              className={`${classes.header} ${
                props.selectedHeader === header.name && "active"
              }`}
            >
              <Box className={classes.headerText}>{header.name}</Box>
              <Tooltip title={`Used by ${header.usedBy.length} step(s)`}>
                <Box className={classes.usedBy}>{header.usedBy.length}</Box>
              </Tooltip>
            </Box>
          ))}
        </Box>
      ) : (
        <Box mt={5} textAlign="center">
          <img src={noCsv} alt="Csv" />
          <Box my={2}>
            <Typography variant="h6">Create a Dataset Schema</Typography>
          </Box>
          <input
            onChange={(e) => handleLoadCsv(e.target.files[0])}
            style={{ display: "none" }}
            type="file"
            id="csv-file"
          />
          <Button
            component="label"
            htmlFor="csv-file"
            variant="outlined"
            color="secondary"
          >
            Add CSV
          </Button>
        </Box>
      )}
    </>
  );
};
