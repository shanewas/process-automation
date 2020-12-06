import React from "react";
import { Box, Typography, Grid, makeStyles } from "@material-ui/core";
import {
  AccessTime as TimeIcon,
  Movie as MovieIcon,
  PlayArrow as PlayIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: "#2F2F2F",
    borderRadius: theme.spacing(1.5),
    overflow: "hidden",
    transition: ".3s",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  contentWrapper: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  thumbnail: {
    backgroundImage: (props) => `url(${props.thumbnail})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "150px",
    position: "relative",
  },
  duration: {
    fontWeight: 700,
    color: "#000",
    backgroundColor: "#fff",
    width: "110px",
    borderRadius: "20px",
    padding: "6px 8px",
    boxShadow: "0px -5px 20px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "20px",
    right: "20px",

    "& > svg": {
      fontSize: "16px",
      marginRight: theme.spacing(1),
    },
  },
  videosCount: {
    fontWeight: 700,
    alignItems: "center",
    justifyContent: "center",
    margin: "12px 0",
    fontSize: "16px",
  },
  category: {
    backgroundColor: "#136BF5",
    fontSize: "16px",
    color: "#fff",
    display: "inline-block",
    padding: "5px 15px",
    borderRadius: "20px",
    fontWeight: 700,
  },
  playIcon: {
    height: "45px",
    width: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    right: "20px",
    bottom: "-20px",
    boxShadow: "0px -5px 20px rgba(0, 0, 0, 0.35)",

    "& > svg": {
      color: "#2F2F2F",
    },
  },
}));

export default ({ url, title, videosCount, duration, category, thumbnail }) => {
  const classes = useStyles({ thumbnail });

  const openUrl = () => {
    window.open(url, "_blank");
  };
  return (
    <Grid item xs={3}>
      <Box onClick={openUrl} className={classes.wrapper}>
        <Box className={classes.thumbnail}>
          <Box className={classes.duration}>
            <TimeIcon />
            {duration}
          </Box>
          <Box className={classes.playIcon}>
            <PlayIcon />
          </Box>
        </Box>
        <Box p={2} mt={2}>
          <Box className={classes.contentWrapper}>
            <Typography variant="h6">{title}</Typography>
            <Box className={classes.videosCount}>
              <MovieIcon /> <span>{videosCount} Videos</span>
            </Box>
          </Box>
          <Box mt={0.5} className={classes.category}>
            {category}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
