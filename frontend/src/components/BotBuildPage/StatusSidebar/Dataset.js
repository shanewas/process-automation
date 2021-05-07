import React from "react";
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
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import * as electron from "../../../electronScript";
import { loadCsv } from "../../../Store/actions";

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
  const dispatch = useDispatch();
  const { csvs } = useSelector(({ csvs }) => ({
    csvs,
  }));

  // const { setCurrentToastr } = useContext(ModalContext);

  const handleLoadCsv = async ({ path, name }) => {
    const headers = await electron.ipcRenderer.sendSync(
      "csv-get-header",
      path,
      5
    );
    const csv = {
      headers: headers,
      filePath: path,
      fileName: name,
    };
    dispatch(loadCsv(csv));
  };

  // const handleLoadCsv = async (file) => {
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

  // const handleUnlinkCsv = () => {
  //   const isAnyStepConnected = headers.find((h) => !!h.usedBy.length);
  //   if (isAnyStepConnected)
  //     return setCurrentToastr({
  //       msg: "Cannot unlink as this CSV is under use.",
  //     });
  //   dispatch(unlinkCsv());
  // };
  return (
    <>
      <Box mb={4}>
        <input
          onChange={(e) => handleLoadCsv(e.target.files[0])}
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
            expandIcon={<ExpandMoreIcon />}
          >
            <Tooltip title={csvs[csvId].filePath}>
              <Box display="flex" alignItems="center">
                <img
                  src={csvSelected}
                  alt={csvs[csvId].fileName}
                  className={classes.csvImg}
                />
                <Box maxWidth="100px">
                  <Typography noWrap variant="subtitle1">
                    {csvs[csvId].fileName}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
            <IconButton size="small">
              <UnlinkIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding style={{ width: "100%" }}>
              {csvs[csvId].headers.map((header) => (
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
