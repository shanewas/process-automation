import React from "react";
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
import { loadCsv } from "../../../Store/actions";
import { LinkOff as UnlinkIcon } from "@material-ui/icons";

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
  },
  headerText: {
    color: theme.palette.grey[400],
    fontSize: "15px",
    fontWeight: 700,
  },
  usedBy: {
    width: "25px",
    height: "auto",
    color: "white",
    backgroundColor: "#2ED3C5",
    color: "#000",
    fontSize: "15px",
    fontWeight: 700,
    borderRadius: "4px",
    textAlign: "center",
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { headers, csvInfo } = useSelector(({ headers, csvInfo }) => ({
    headers,
    csvInfo,
  }));

  console.log({ csvInfo });

  const handleLoadCsv = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const headers = result.data[0];
        const csvInfo = file;
        csvInfo["rowNumber"] = result.data.length;

        dispatch(
          loadCsv({
            headers,
            csvInfo,
          })
        );
      },
    });
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
              <img src="/assets/images/csv_colored.png" alt="Csv" />
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
              <Tooltip title="Unlink with this CSV">
                <IconButton size="small">
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
              className={classes.header}
            >
              <Box className={classes.headerText}>{header.name}</Box>
              <Box className={classes.usedBy}>{header.usedBy.length}</Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box mt={5} textAlign="center">
          <img src="/assets/images/csv.svg" alt="Csv" />
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
