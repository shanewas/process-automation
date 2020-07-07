import React, { useMemo, useCallback } from "react";
import { TextField, Grid } from "@material-ui/core";
import SelectorInput from "./SelectorInput";

export default ({ onChange, value, onSelectorChange, inputTypes }) => {
  console.log("%c TYPE LOAD DATA ", "background: #222; color: #bada55");
  return (
    <Grid container direction="column" spacing={3}>
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
          onChange={useCallback((e) => onSelectorChange(e), [])}
          // value={value.type}
          // onChange={onSelectorChange}
          options={inputTypes}
          placeholder="Input Type"
        />
      </Grid>
      {/* { [TODO]: WHy Manual entry? Conditional view (dataheader) b/w Column and Manual entry} */}
      {value.dataHeader ? (
        <>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={onChange}
              value={value.dataHeader}
              name="dataHeader"
              label="Data Column"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={onChange}
              value={value.dataHeaderindex}
              name="dataHeaderindex"
              label="Data Column Number"
              fullWidth
            />
          </Grid>
        </>
      ) : (
        <Grid item>
          <TextField
            variant="outlined"
            onChange={onChange}
            value={value.MenualData}
            name="MenualData"
            label="Manual Data Entry"
            fullWidth
          />
        </Grid>
      )}
    </Grid>
  );
};
