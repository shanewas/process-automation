import React from "react";
import { Box, Typography } from "@material-ui/core";
import IndividualBotPerformanceChart from "./IndividualBotPerformanceChart";

export default (props) => {
  return (
    <Box
      borderRadius="10px"
      my={5}
      px={2}
      pt={3}
      pb={2}
      bgcolor="background.paper"
    >
      <Box
        borderRadius="5px"
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography color="textPrimary" variant="h6" className="bold">
          Your Performance
        </Typography>
      </Box>
      <IndividualBotPerformanceChart />
    </Box>
  );
};
