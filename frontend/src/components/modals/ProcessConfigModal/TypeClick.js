import React from "react";
import { TextField, Grid } from "@material-ui/core";

export default ({ onChange, value }) => {
  // console.log("%c TYPE CLICK ", "background: #222; color: #bada55");
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
    </Grid>
  );
};
