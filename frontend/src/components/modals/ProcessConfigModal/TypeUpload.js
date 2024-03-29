import React from "react";
import { TextField, Box, Button } from "@material-ui/core";

export default ({ onChange, xpath, uploadPath, getUploadFolderPath }) => {
  console.log("%c TYPE UPLOAD DATA ", "background: #222; color: #bada55");

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
          value={uploadPath}
          label="Upload folder path"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <Button
          onClick={getUploadFolderPath}
          variant="contained"
          disableElevation
        >
          Select Path
        </Button>
      </Box>
    </>
  );
};
