import React from "react";
import { Box, Typography } from "@material-ui/core";
import RecentActivityItem from "./RecentActivityItem";

const recentActivities = [
  {
    id: 1,
    time: "today",
    message: "Test bot: Ready",
  },
  {
    id: 2,
    time: "yesterday",
    message: "Test Process sequence initiated",
  },
  {
    id: 3,
    time: "a month ago",
    message: "Test bot initiated",
  },
];

export default (props) => {
  return (
    <Box borderRadius="10px" p={4} bgcolor="background.paper">
      <Box mb={2}>
        <Typography variant="subtitle1" className="poppins bold">
          RECENT ACTIVITIES
        </Typography>
      </Box>
      <Box>
        {recentActivities.map((ra) => (
          <RecentActivityItem key={ra.id} {...ra} />
        ))}
      </Box>
    </Box>
  );
};
