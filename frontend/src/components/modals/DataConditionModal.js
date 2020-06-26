import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  Select,
  Paper,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@material-ui/core/";
import shortId from "shortid";

import { Edit as EditIcon, Close as CloseIcon } from "@material-ui/icons/";

const initState = {
  el1: "",
  el1isManual: true,
  el1headerIdx: null,
  el2: "",
  el2isManual: true,
  el2headerIdx: null,
  operator: "",
  id: null,
};

const DataConditionModal = ({
  open,
  handleClose,
  headers,
  process,
  editProcess,
}) => {
  const [values, setValues] = useState(initState);
  const [tConditions, setTConditions] = useState(process.conditions || []);
  const [errors, setErrors] = useState({});

  const editCondition = (id) => {
    const condition = tConditions.find((c) => c.id === id);
    setErrors({});
    setValues(condition);
  };

  const toggleEl1Type = (_) =>
    setValues((v) => ({
      ...v,
      el1isManual: !v.el1isManual,
      el1: "",
      el1headerIdx: null,
    }));
  const toggleEl2Type = (_) =>
    setValues((v) => ({
      ...v,
      el2isManual: !v.el2isManual,
      el2: "",
      el2headerIdx: null,
    }));

  const handleCancelEdit = (_) => setValues(initState);

  const handleSelectChange = (el) => (e) => {
    const idx = headers.findIndex((h) => h === e.target.value);
    const tValues = { ...values, [el]: e.target.value };
    if (el !== "operator") tValues[`${el}headerIdx`] = idx;
    setValues(tValues);
  };

  const handleInputChange = (e) => {
    e.persist();
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (_) => {
    setErrors({});
    // add
    if (!values.id) {
      const err = {};
      const vals = {
        el1: values.el1.trim(),
        el2: values.el2.trim(),
        operator: values.operator.trim(),
      };
      Object.entries(vals).forEach(
        ([field, val]) => !val && (err[field] = "Required")
      );
      setValues((v) => ({ ...v, vals }));
      setErrors(err);
      if (Object.keys(err).length > 0) return;
      const conditions = [...tConditions, { ...values, id: shortId() }];
      updateProcessWithCondition(conditions);
    } else {
      const conditions = tConditions.map((c) =>
        c.id === values.id ? { ...values } : c
      );
      updateProcessWithCondition(conditions);
    }
  };

  const updateProcessWithCondition = (conditions) => {
    setTConditions(conditions);
    setValues(initState);
    editProcess({ ...process, conditions });
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id="alert-dialog-title">
        <Grid container justify="space-between">
          <Grid item>Conditions Modal {values.id && "[Edit Mode]"}</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ fontSize: "16px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid spacing={1} container>
          <Grid item sm>
            <ElTypeHeader
              toggle={toggleEl1Type}
              isManual={values.el1isManual}
            />
            <Box mt={1}>
              {values.el1isManual ? (
                <TextField
                  onChange={handleInputChange}
                  name="el1"
                  error={!!errors.el1}
                  helperText={errors.el1}
                  value={values.el1}
                  variant="outlined"
                  placeholder="Element 1"
                />
              ) : (
                <HeaderSelector
                  headers={headers}
                  error={!!errors.el1}
                  handleChange={handleSelectChange("el1")}
                  value={values.el1}
                />
              )}
            </Box>
          </Grid>
          <Grid item sm>
            <span>Operator</span>
            <Box mt={1}>
              <OperatorSelector
                value={values.operator}
                error={!!errors.operator}
                helperText={errors.operator}
                handleChange={handleSelectChange("operator")}
              />
            </Box>
          </Grid>
          <Grid item sm>
            <ElTypeHeader
              toggle={toggleEl2Type}
              isManual={values.el2isManual}
            />
            <Box mt={1}>
              {values.el2isManual ? (
                <TextField
                  error={!!errors.el2}
                  helperText={errors.el2}
                  variant="outlined"
                  placeholder="Element 2"
                  onChange={handleInputChange}
                  name="el2"
                  value={values.el2}
                />
              ) : (
                <HeaderSelector
                  value={values.el2}
                  error={!!errors.el2}
                  headers={headers}
                  handleChange={handleSelectChange("el2")}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box mt={2}>
          <ConditionsTable
            editCondition={editCondition}
            conditions={tConditions}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {values.id && (
          <Button onClick={handleCancelEdit} color="primary">
            Cancel Edit
          </Button>
        )}
        <Button onClick={handleSubmit} color="primary">
          {values.id ? "Update" : "Add"}
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

const ConditionsTable = ({ conditions, editCondition }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Element 1</TableCell>
          <TableCell align="right">Operator</TableCell>
          <TableCell align="right">Element 2</TableCell>
          <TableCell align="right">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {conditions.map((condition) => (
          <TableRow key={condition.id}>
            <TableCell>{condition.el1}</TableCell>
            <TableCell align="right">{condition.operator}</TableCell>
            <TableCell align="right">{condition.el2}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => editCondition(condition.id)}>
                <EditIcon style={{ fontSize: "16px" }} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const OperatorSelector = ({ value = "", handleChange, error }) => (
  <Select
    variant="outlined"
    style={{ width: "100%" }}
    value={value}
    error={error}
    onChange={handleChange}
    placeholder="Operator"
  >
    <MenuItem value={">"}>{">"}</MenuItem>
    <MenuItem value={"="}>{"="}</MenuItem>
    <MenuItem value={"<"}>{"<"}</MenuItem>
  </Select>
);

const HeaderSelector = ({ value = "", handleChange, headers = [], error }) => {
  return (
    <Select
      variant="outlined"
      style={{ width: "100%" }}
      value={value}
      error={error}
      onChange={handleChange}
      placeholder="Header"
    >
      {headers.length === 0 ? (
        <MenuItem disabled aria-label="None" value="">
          No Header found
        </MenuItem>
      ) : (
        headers.map((header) => (
          <MenuItem key={header} value={header}>
            {header}
          </MenuItem>
        ))
      )}
    </Select>
  );
};

export default DataConditionModal;
