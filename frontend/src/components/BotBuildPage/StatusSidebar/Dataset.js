import React, { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import csvSelected from "../../../images/csv_colored.png";

import * as electron from "../../../electronScript";

const useStyles = makeStyles((theme) => ({
  csvImg: {
    width: "auto",
    height: "35px",
    marginRight: theme.spacing(1.5),
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { csvs } = useSelector(({ csvs }) => ({
    csvs,
  }));
  // const { setCurrentToastr } = useContext(ModalContext);

  const handleLoadCsv = async (file) => {
    const headers = await electron.ipcRenderer.sendSync(
      "csv-get-header",
      file.path,
      5
    );

    console.log(headers);
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip title={csvs[csvId].filepath}>
              <Box display="flex" alignItems="center">
                <img
                  src={csvSelected}
                  alt={csvs[csvId].filename}
                  className={classes.csvImg}
                />
                <Typography variant="subtitle1">
                  {csvs[csvId].filename}
                </Typography>
              </Box>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
