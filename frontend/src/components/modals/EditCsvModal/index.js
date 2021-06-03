import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  IconButton,
  TextField,
  makeStyles,
  Chip,
  Slider,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon, SettingsPowerRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import csvImg from "../../../images/csv_colored.png";
import { addCsv, updateCsv } from "../../../Store/actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

// EditCsvmodal handles both adding and editing of csvs instances
const EditCsvModal = ({ csv, totalRows, csvId = null, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [csvInfo, setCsvInfo] = useState({
    name: csv.name,
    range: csvId ? csv.range : [2, totalRows],
    selectedHeaders: csvId ? csv.selectedHeaders : csv.allHeaders,
  });

  const handleRangeChange = (e, newValue) =>
    setCsvInfo((old) => ({ ...old, range: newValue }));

  const handleChange = (e) => {
    e.persist();
    setCsvInfo((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!csvInfo.name.trim()) return setError("Please enter the csv name");
    const tCsv = {
      ...csvInfo,
      allHeaders: csv.allHeaders,
      filePath: csv.filePath,
      totalRows: totalRows,
    };
    dispatch(csvId ? updateCsv({ csvId, ...tCsv }) : addCsv(tCsv));
    props.handleClose();
  };

  const removeHeader = (header) =>
    setCsvInfo((o) => ({
      ...o,
      selectedHeaders: o.selectedHeaders.filter((h) => h !== header),
    }));

  const addHeader = (header) =>
    setCsvInfo((o) => ({
      ...o,
      selectedHeaders: [...o.selectedHeaders, header],
    }));

  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {csvId ? "Edit " : "Add "} CSV
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box my={2} className={classes.wrapper}>
          <Box display="flex" alignItems="center">
            <img style={{ marginRight: "20px" }} src={csvImg} alt="csv" />
            <Box maxWidth="60%">
              <Typography noWrap variant="h6">
                {csvInfo.name}
              </Typography>
              <Typography noWrap variant="subtitle2">
                {csv.filePath}
              </Typography>
            </Box>
          </Box>
          <TextField
            name="name"
            value={csvInfo.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Csv name"
          />
          <Box>
            <Box mb={1}>
              <Typography variant="h6">Headers</Typography>
              <Typography variant="body2">(First row of the CSV)</Typography>
            </Box>
            {csv.allHeaders.map((header) => (
              <Chip
                variant={
                  csvInfo.selectedHeaders.includes(header)
                    ? "default"
                    : "outlined"
                }
                color={
                  csvInfo.selectedHeaders.includes(header)
                    ? "primary"
                    : "default"
                }
                onDelete={
                  csvInfo.selectedHeaders.includes(header)
                    ? () => removeHeader(header)
                    : undefined
                }
                clickable={!csvInfo.selectedHeaders.includes(header)}
                onClick={() => addHeader(header)}
                style={{ margin: "5px 10px 5px 0" }}
                key={header}
                label={header}
              />
            ))}
          </Box>

          <Box style={{ marginTop: "32px" }}>
            <Typography variant="h6">
              Select the range of rows{" "}
              <Box
                component="span"
                fontSize="15px"
                bgcolor="black"
                px={1}
                py={0.5}
              >
                [{csvInfo.range[0]} - {csvInfo.range[1]}]
              </Box>
            </Typography>
            <Typography variant="body2">
              Range includes the headers (First row)
            </Typography>
            <Box mt={2}>
              <Slider
                value={csvInfo.range}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                min={2}
                max={totalRows}
              />
            </Box>
          </Box>
          {error && (
            <Box fontSize="16px" color="red">
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box mb={1}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {csvId ? "Update " : "Add "} CSV
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditCsvModal;
