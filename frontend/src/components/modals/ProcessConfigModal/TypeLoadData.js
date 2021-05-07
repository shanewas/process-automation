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
  value,
  onSelectorChange,
  inputTypes,
  variables,
  csvs,
  onClearHeaderData,
}) => {
  const formattedCsvs = {};
  Object.keys(csvs).forEach((csvId) => {
    formattedCsvs[csvId] = [csvs[csvId].fileName, ...csvs[csvId].headers];
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
            checked={value.clearField}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={value.xpath}
          name="xpath"
          label="XPath"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={value.value}
          name="value"
          label="Value"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={value.placeholder}
          name="placeholder"
          label="Placeholder"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={value.label}
          name="label"
          label="Label"
          fullWidth
        />
      </Grid>
      <Grid item>
        <SelectorInput
          value={useMemo(() => value.type, [value.type])}
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
              <EntryTypeHeader type={value.entryType} onChange={onChange} />
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
      {value.entryType === "dataHeader" && (
        <Grid item>
          <Select
            variant="outlined"
            onChange={onHeaderChange}
            value={value.dataEntry}
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
      {value.entryType === "manual" && (
        <Grid item>
          <TextField
            variant="outlined"
            onChange={onChange}
            value={value.dataEntry}
            name="dataEntry"
            label="Manual Data Entry"
            fullWidth
          />
        </Grid>
      )}
      {value.entryType === "variable" && (
        <Grid item>
          <SelectorInput
            placeholder="Use Variable"
            name="dataEntry"
            value={value.dataEntry}
            onChange={onChange}
            options={variables}
            optionsConfigure={{ id: "name", label: "name", value: "name" }}
          />
        </Grid>
      )}
    </Grid>
  );
};
