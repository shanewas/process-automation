import React from "react";
import { Typography, makeStyles, Box, Grid } from "@material-ui/core";

import TemplateCard from "./TemplateCard";
import templates from "./templates";

const useStyles = makeStyles((theme) => ({
  banner: {
    background:
      "url('/assets/images/templates_banner.png'), linear-gradient(269.88deg, #3EA8E6 53.78%, #12AE94 95.79%)",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    borderRadius: theme.spacing(2),
    padding: "72px 22px",
  },
  card: {
    border: "1px solid #7d7d7d",
    height: "100%",
    borderRadius: theme.spacing(1.5),
    padding: "22px 16px",
    transition: ".3s",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  iconWrapper: {
    background: "rgba(116, 227, 206, 0.3)",
    display: "flex",
    height: "65px",
    width: "65px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    margin: "0 auto",
  },
  icon: {
    color: "#74E3CE",
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

export default (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Templates</Typography>
      <Box mt={3} mb={5} className={classes.banner}>
        <Box mb={2}>
          <Typography variant="h4">
            Get started with our most popular workflows
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          These templates can help you start saving time right away, <br />
          no matter how complicated the flow is.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </Grid>
    </>
  );
};
