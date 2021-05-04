import React from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& > *": {
      marginTop: theme.spacing(3.5),
    },
  },
}));

export default ({ onChange, link, socket, ip, port }) => {
  const classes = useStyles();
  // console.log("%c TYPE LINK ", "background: #222; color: #bada55");

  return (
    <Box className={classes.wrapper}>
      <TextField
        variant="outlined"
        onChange={onChange}
        value={link}
        name="link"
        label="Link"
        fullWidth
      />
      <TextField
        variant="outlined"
        onChange={onChange}
        value={socket}
        name="socket"
        label="Socket"
        fullWidth
      />
      <TextField
        variant="outlined"
        onChange={onChange}
        value={ip}
        name="ip"
        label="Ip"
        fullWidth
      />
      <TextField
        variant="outlined"
        onChange={onChange}
        value={port}
        name="port"
        label="Port"
        fullWidth
      />
    </Box>
  );
};
