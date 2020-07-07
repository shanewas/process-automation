import React from "react";
import { TextField, Box } from "@material-ui/core";

export default ({ onChange, value }) => {
  console.log("%c TYPE LINK ", "background: #222; color: #bada55");

  return (
    <Box mt={2}>
      <TextField
        variant="outlined"
        onChange={onChange}
        value={value}
        name="link"
        label="Link"
        fullWidth
      />
    </Box>
  );
};
