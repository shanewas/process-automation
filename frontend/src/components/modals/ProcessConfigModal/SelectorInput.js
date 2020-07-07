import React from "react";
import { Select, MenuItem, Grid, Typography } from "@material-ui/core";

const SelectorInput = ({ value = "", placeholder, onChange, options = [] }) => {
  {
    console.log("selector input");
  }
  return (
    <Grid container nopad="true" alignItems="center" spacing={2}>
      <Grid item>
        <Typography>{placeholder}:</Typography>
      </Grid>
      <Grid item>
        <Select
          variant="outlined"
          fullWidth
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        >
          {options.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default React.memo(SelectorInput);
