import React from "react";
import { Select, MenuItem, Grid, Typography } from "@material-ui/core";

const SelectorInput = ({
  value = "",
  placeholder,
  onChange,
  options = [],
  error,
  optionsConfigure,
}) => (
  <Grid container nopad="true" alignItems="center" spacing={2}>
    {console.log(optionsConfigure)}
    <Grid item>
      <Typography>{placeholder}:</Typography>
    </Grid>
    <Grid item sm>
      <Select
        variant="outlined"
        fullWidth
        error={!!error}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        {options.map((opt) =>
          typeof opt === "string" ? (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ) : (
            <MenuItem
              key={opt[optionsConfigure.id]}
              value={opt[optionsConfigure.value]}
            >
              {opt[optionsConfigure.label]}
            </MenuItem>
          )
        )}
      </Select>
    </Grid>
  </Grid>
);

export default React.memo(SelectorInput);
