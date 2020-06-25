import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Select,
  makeStyles,
  Box,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
}));

const DataConditionModal = ({ open, handleClose, headers, conditions }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    el1: "",
    el1isManual: true,
    el1headerIdx: "",
    el2: "",
    el2isManual: true,
    el2headerIdx: "",
    operator: "",
  });

  const toggleEl1Type = (_) =>
    setValues((v) => ({ ...v, el1isManual: !v.el1isManual }));
  const toggleEl2Type = (_) =>
    setValues((v) => ({ ...v, el2isManual: !v.el2isManual }));

  const handleChange = (e, v) => console.log({ e, v });

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id="alert-dialog-title">Conditions Modal</DialogTitle>
      <DialogContent>
        <Grid spacing={1} container>
          <Grid item sm>
            <ElTypeHeader
              toggle={toggleEl1Type}
              isManual={values.el1isManual}
            />
            <Box mt={1}>
              {values.el1isManual ? (
                <TextField variant="outlined" placeholder="Element 1" />
              ) : (
                <HeaderSelector headers={headers} handleChange={handleChange} />
              )}
            </Box>
          </Grid>
          <Grid item sm>
            <span>Operator</span>
            <Box mt={1}>
              <TextField variant="outlined" placeholder="Operator" />
            </Box>
          </Grid>
          <Grid item sm>
            <ElTypeHeader
              toggle={toggleEl2Type}
              isManual={values.el2isManual}
            />
            <Box mt={1}>
              {values.el2isManual ? (
                <TextField variant="outlined" placeholder="Element 2" />
              ) : (
                <HeaderSelector headers={headers} handleChange={handleChange} />
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ElTypeHeader = ({ isManual, toggle }) => (
  <div onClick={toggle} style={{ cursor: "pointer" }}>
    <span style={{ fontWeight: isManual ? 700 : 400 }}>Manual</span> /{" "}
    <span style={{ fontWeight: isManual ? 400 : 700 }}>Header</span>
  </div>
);

const HeaderSelector = ({ value = "", handleChange, headers = [] }) => (
  <Select
    variant="outlined"
    native
    style={{ width: "100%" }}
    value={value}
    onChange={handleChange}
    placeholder="Header"
  >
    {headers.length === 0 ? (
      <option disabled aria-label="None" value="">
        No Header found
      </option>
    ) : (
      headers.map((header) => (
        <option key={header} value={header}>
          {header}
        </option>
      ))
    )}
  </Select>
);

export default DataConditionModal;
