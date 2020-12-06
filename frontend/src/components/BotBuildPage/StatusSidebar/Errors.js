import React from "react";
import { Box, Button, Typography } from "@material-ui/core";

export default (props) => {
  return (
    <Box mt={5} textAlign="center">
      <img src="/assets/images/no_errors.svg" alt="Csv" />
      <Box my={2}>
        <Typography variant="h6">Everything looks good, no errors</Typography>
      </Box>
    </Box>
  );
};
