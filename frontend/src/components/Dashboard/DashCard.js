import React from "react";
import { Box, Typography } from "@material-ui/core";

const DashCard = ({ value, title }) => {
  return (
    <Box
      p={4}
      borderRadius="10px"
      textAlign="center"
      bgcolor="background.paper"
    >
      <Typography variant="h3" className="poppins bold">
        {value}
      </Typography>
      <Box mt={1}>
        <Typography className="card-text" variant="subtitle2">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashCard;
