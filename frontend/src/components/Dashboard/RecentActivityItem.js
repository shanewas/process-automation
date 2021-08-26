import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  circle: {
    display: "inline-block",
    height: "20px",
    width: "20px",
    border: `4px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
}));

export default ({ time, message }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mb={3.5}>
      <Box className={classes.circle} />
      <Box ml={3}>
        <Typography
          color="secondary"
          variant="subtitle1"
          className="uppercase bold poppins"
        >
          {time}
        </Typography>
        <Box mt={0.5}>
          <Typography className="grey">{message}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
