import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { LinkRounded as LinkIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  step: {
    width: "80%",
    borderRadius: theme.spacing(1),
    margin: "0 auto",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    border: ".8px solid rgba(0,0,0,0)",
    transition: ".3s",
    "&:hover": {
      border: `.8px solid ${theme.palette.secondary.main}`,
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(2),
    height: "50px",
    width: "50px",
    color: theme.palette.secondary.main,
    borderRadius: "50%",
    background: "rgba(106, 217, 196, 0.15)",
    // background: rgba(92, 135, 220, 0.2);
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.step}>
      <Box className={classes.icon}>
        <LinkIcon />
      </Box>
      <Box>
        <Typography variant="h6">Opened a Link</Typography>
        <Typography>https://google.com</Typography>
      </Box>
    </Box>
  );
};
