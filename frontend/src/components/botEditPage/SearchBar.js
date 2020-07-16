import React, { useState } from "react";
import * as electron from "../../electronScript";
import RoundedTF from "../layout/input/RoundedTF";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { OpenInBrowser as WebIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "12%",
    left: "60%",
    transform: "translate(-50%, 50%)",
  },
});

export default (props) => {
  const [url, setUrl] = useState("");
  const classes = useStyles();

  const handleUrlChange = (e) => {
    e.persist();
    setUrl(e.target.value);
  };

  const openLink = (e) => {
    if (!url) return;
    electron.send(electron.SearchLinkChannel, url);
  };

  return (
    <Box className={classes.root}>
      <RoundedTF
        endAdornment={
          <IconButton onClick={openLink} color="primary">
            <WebIcon />
          </IconButton>
        }
        disableUnderline
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL"
      />
    </Box>
  );
};
