import React from "react";
import { Switch, Grid, Typography, Box, TextField, Button, Divider } from "@material-ui/core";
import SelectorInput from "../../layout/input/SelectorInput";

export default ({
  value,
  onChange,
  onSwitch,
  saveToVariable,
  variables,
  screenshotPath,
  getScreenshotFolderPath,
  getOcrFolderPath,
  ocrPath,
}) => {
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
      <Box mt={2}>
        <TextField
          disabled
          variant="outlined"
          value={screenshotPath}
          label="Screenshot save path"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <Button
          onClick={getScreenshotFolderPath}
          variant="contained"
          disableElevation
        >
          Select Path
        </Button>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      <Box mt={2}>
        <TextField
          disabled
          variant="outlined"
          value={ocrPath}
          label="OCR Path"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <Button onClick={getOcrFolderPath} variant="contained" disableElevation>
          Select Path
        </Button>
      </Box>
    </Box>
  );
};
