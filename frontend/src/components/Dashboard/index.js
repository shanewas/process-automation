import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import UsageStatsTable from "./UsageStatsTable";
import DashCard from "./DashCard";
import RecentActivities from "./RecentActivities";
import IndividualBotPerformance from "./IndividualBotPerformance";

export default (props) => {
  return (
    <Box overflow="hidden">
      <Typography variant="h4">Hey Sohaib, Welcome</Typography>

      <Box my={5}>
        <UsageStatsTable />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <DashCard title="Bots" value="130" />
            </Grid>
            <Grid item xs={6}>
              <DashCard value="$11,230" title="Testing Analytics" />
            </Grid>
          </Grid>
          <IndividualBotPerformance />
        </Grid>
        <Grid item xs={4}>
          <RecentActivities />
        </Grid>
      </Grid>
    </Box>
  );
};
