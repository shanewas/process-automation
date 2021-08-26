import React from "react";

import {
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #7d7d7d",
    borderRadius: theme.spacing(1.5),
    padding: "22px 16px",
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: ".3s",

    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  title: {
    // height: "60px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // fontWeight: 700,
  },
  iconWrapper: {
    background: (props) => props.backgroundColor,
    display: "flex",
    height: "65px",
    width: "65px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    margin: "0 auto",
  },
  icon: {
    color: (props) => props.color,
    height: "32px",
    width: "32px",
  },
  createdBy: {
    color: "#76DAFF",
    fontWeight: 700,
  },
  usedBy: {
    fontWeight: 700,
  },
  useBtn: {
    background: "#A1FFB3",
    borderRadius: "30px",
    padding: "8px 36px",
    "&:hover": {
      background: "#A1FFB3",
    },
  },
}));

export default ({
  title,
  createdBy,
  //   createdById,
  usedBy,
  color,
  backgroundColor,
  Icon,
}) => {
  const classes = useStyles({ color, backgroundColor });
  return (
    <Grid item xs={3}>
      <Box className={classes.card}>
        <Box>
          <Box className={classes.iconWrapper}>
            <Icon className={classes.icon} />
          </Box>
          <Box mt={3} mb={1.5} className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            Created by:{" "}
            <Box component="span" className={classes.createdBy}>
              {createdBy}
            </Box>
          </Typography>
          <Box my={2}>
            <Divider />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" className={classes.usedBy}>
              Used by: <br />
              {usedBy} users
            </Typography>
            <Button variant="contained" className={classes.useBtn}>
              Use
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
