import React from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";
import videos from "./videos";
import VideoCard from "./VideoCard";

export default (props) => {
  return (
    <>
      <Box mb={5}>
        <Typography variant="h4">Academy</Typography>
      </Box>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </Grid>
    </>
  );
};
