import React, { useMemo } from "react";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  Switch,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import SelectorInput from "../../layout/input/SelectorInput";
import EntryTypeHeader from "./EntryTypeHeader";

export default ({
  onChange,
  onSwitch,
  onHeaderChange,
  step,
  onSelectorChange,
  inputTypes,
  variables,
  csvs,
  onClearHeaderData,
}) => {
  const formattedCsvs = {};
  Object.keys(csvs).forEach((csvId) => {
    formattedCsvs[csvId] = [csvs[csvId].name, ...csvs[csvId].selectedHeaders];
  });

  // {
  //   'asdnias': ['fileName.csv', 'header1', 'header2'];
  // }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container spacing={2} alignItems="center">
        <Grid item>
          <Typography>Clear field:</Typography>
        </Grid>
        <Grid item>
          <Switch
            name="clearField"
            onChange={onSwitch}
            checked={step.clearField}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={step.xpath}
          name="xpath"
          label="XPath"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={step.value}
          name="value"
          label="Value"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={step.placeholder}
          name="placeholder"
          label="Placeholder"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={step.label}
          name="label"
          label="Label"
          fullWidth
        />
      </Grid>
      <Grid item>
        <SelectorInput
          value={useMemo(() => step.type, [step.type])}
          onChange={(e) => onSelectorChange(e)}
          options={inputTypes}
          placeholder="Input Type"
        />
      </Grid>
      <Box mt={2} mx={2}>
        <Grid container nopad="true" justify="space-between">
          <Grid item>
            <Typography variant="subtitle2">Data Entry</Typography>
            <Box>
              <EntryTypeHeader type={step.entryType} onChange={onChange} />
            </Box>
          </Grid>
          <Grid item>
            <Button
              onClick={onClearHeaderData}
              style={{ textTransform: "capitalize" }}
            >
              Clear Data Entry
            </Button>
          </Grid>
        </Grid>
      </Box>
      {step.entryType === "dataHeader" && (
        <Grid item>
          <Select
            variant="outlined"
            onChange={onHeaderChange}
            value={step.csvId ? `${step.csvId}-header-${step.dataEntry}` : ""}
            name="dataEntry"
            placeholder="Data Header"
            fullWidth
          >
            {Object.keys(formattedCsvs).map((csvId) =>
              formattedCsvs[csvId].map((header, idx) =>
                idx === 0 ? (
                  <ListSubheader key={csvId}>{header}</ListSubheader>
                ) : (
                  <MenuItem key={header} value={`${csvId}-header-${header}`}>
                    {header}
                  </MenuItem>
                )
              )
            )}
            {/* 
              csvs[csvId].headers.map((header) => (
                <MenuItem key={header} onChange={header}>
                  {header}
                </MenuItem>
              ))} */}
          </Select>
        </Grid>
      )}
      {step.entryType === "manual" && (
        <Grid item>
          <TextField
            variant="outlined"
            onChange={onChange}
            value={step.dataEntry}
            name="dataEntry"
            label="Manual Data Entry"
            fullWidth
          />
        </Grid>
      )}
      {step.entryType === "variable" && (
        <Grid item>
          <SelectorInput
            placeholder="Use Variable"
            name="dataEntry"
            value={step.dataEntry}
            onChange={onChange}
            options={variables}
            optionsConfigure={{ id: "name", label: "name", value: "name" }}
          />
        </Grid>
      )}
    </Grid>
  );
};
