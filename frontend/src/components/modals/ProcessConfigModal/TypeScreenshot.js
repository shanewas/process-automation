import React from "react";
import { Switch, Grid, Typography, Box } from "@material-ui/core";
import SelectorInput from "../../layout/input/SelectorInput";

export default ({ value, onChange, onSwitch, saveToVariable, variables }) => {
  console.log("%c TYPE SCREENSHOT ", "background: #222; color: #bada55");
  return (
    <Box>
      <Grid container nopad="true" spacing={2} alignItems="center">
        <Grid item>
          <Typography>Use OCR:</Typography>
        </Grid>
        <Grid item>
          <Switch name="ocr" onChange={onSwitch} checked={value} />
        </Grid>
      </Grid>
      {value && (
        <Grid container>
          <SelectorInput
            options={variables}
            name="saveToVariable"
            value={saveToVariable}
            onChange={onChange}
            optionsConfigure={{ id: "id", label: "name", value: "name" }}
            placeholder="Save to a variable"
          />
        </Grid>
      )}
    </Box>
  );
};
