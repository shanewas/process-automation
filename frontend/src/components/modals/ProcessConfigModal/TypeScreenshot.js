import React from "react";
import { Switch, Grid, Typography } from "@material-ui/core";

export default ({ value, onChange }) => {
  console.log("%c TYPE SCREENSHOT ", "background: #222; color: #bada55");
  return (
    <Grid container nopad="true" spacing={2} alignItems="center">
      <Grid item>
        <Typography>Use OCR:</Typography>
      </Grid>
      <Grid item>
        <Switch onChange={onChange} checked={value} />
      </Grid>
    </Grid>
  );
};
