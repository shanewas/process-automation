import React, { useContext } from "react";
// { name: "LoadCsvModal" }
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
  Tooltip,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import csvSelected from "../../../images/csv_colored.png";
import {
  ExpandMore as ExpandMoreIcon,
  LinkOff as UnlinkIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

import * as electron from "../../../electronScript";

import { ModalContext } from "../../../context/ModalContext";

const useStyles = makeStyles((theme) => ({
  csvImg: {
    width: "auto",
    height: "25px",
    marginRight: theme.spacing(1.5),
  },
  csvHeader: {
    justifyContent: "space-between",
  },
}));

export default (props) => {
  const classes = useStyles();

  const { setCurrentModal } = useContext(ModalContext);
  const { csvs } = useSelector(({ csvs }) => ({
    csvs,
  }));

  console.log(csvs);

  const handleEditCsv = (csvId) => {
    const { totalRows, ...csv } = csvs[csvId];
    setCurrentModal({
      name: "EditCsvModal",
      props: {
        csvId,
        csv,
        totalRows,
      },
    });
  };

  const handleAddCsv = async (file) => {
    const headers = await electron.ipcRenderer.sendSync(
      "csv-get-header",
      file.path,
      5
    );
    const totalRows = await electron.ipcRenderer.sendSync(
      "csv-get-row",
      file.path,
      5
    );
    const csv = {
      allHeaders: headers,
      filePath: file.path,
      name: file.name.replace(".csv", ""),
    };

    setCurrentModal({
      name: "EditCsvModal",
      props: {
        csv,
        totalRows,
      },
    });
  };

  // const handleAddCsv = async (file) => {
  //   console.log(file.path);
  //   const header = await electron.ipcRenderer.sendSync(
  //     "csv-get-header",
  //     file.path,
  //     5
  //   );
  // Papa.parse(file, {
  //   complete: (result) => {
  //     const headers = result.data[0];
  //     const csvInfo = {
  //       name: file.name,
  //       path: file.path,
  //       rowNumber: result.data.length,
  //     };
  //     // console.log({ csvInfo });
  //     dispatch(
  //       loadCsv({
  //         headers,
  //         csvInfo,
  //       })
  //     );
  //   },
  // });
  // };

  return (
    <>
      <Box mb={4}>
        <input
          onChange={(e) => handleAddCsv(e.target.files[0])}
          style={{ display: "none" }}
          type="file"
          id="csv-file"
        />
        <Button
          fullWidth
          component="label"
          htmlFor="csv-file"
          variant="contained"
          color="primary"
        >
          Add CSV
        </Button>
      </Box>
      {Object.keys(csvs).map((csvId) => (
        <Accordion key={csvId}>
          <AccordionSummary
            classes={{ content: classes.csvHeader }}
            // expandIcon={<ExpandMoreIcon />}
          >
            <Box mr="auto" display="flex" alignItems="center">
              <img
                src={csvSelected}
                alt={csvs[csvId].name}
                className={classes.csvImg}
              />
              <Tooltip title={csvs[csvId].filePath}>
                <Box maxWidth="100px">
                  <Typography noWrap variant="subtitle1">
                    {csvs[csvId].name}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box mr={2}>
              <IconButton onClick={() => handleEditCsv(csvId)} size="small">
                <EditIcon />
              </IconButton>
            </Box>
            <IconButton size="small">
              <UnlinkIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding style={{ width: "100%" }}>
              {csvs[csvId].selectedHeaders.map((header) => (
                <ListItem key={header}>
                  <ListItemText primary={header} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
