import React from "react";
import { TextField, Box, Button } from "@material-ui/core";

export default ({ onChange, xpath, downloadPath, getDownloadFolderPath }) => {
  // console.log("%c TYPE DOWNLOAD DATA ", "background: #222; color: #bada55");

  return (
    <>
      <Box mt={2}>
        <TextField
          variant="outlined"
          onChange={onChange}
          value={xpath}
          name="xpath"
          label="XPath"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <TextField
          disabled
          variant="outlined"
          value={downloadPath}
          label="Download folder path"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <Button
          onClick={getDownloadFolderPath}
          variant="contained"
          disableElevation
        >
          Select Path
        </Button>
      </Box>
    </>
  );
};
