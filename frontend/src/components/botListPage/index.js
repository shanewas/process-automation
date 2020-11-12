import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  CloudUploadRounded as ImportIcon,
  AddCircleRounded as AddIcon,
} from "@material-ui/icons";
import BotTable from "./BotTable";
import * as electron from "../../electronScript";

export default (props) => {
  const importBot = () => {
    electron.ipcRenderer.send(electron.importBot);
  };
  return (
    <>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex">
          <Box mr={2}>
            <Typography variant="h4">Bots</Typography>
          </Box>
          <Button
            component={Link}
            to="/build"
            variant="contained"
            color="primary"
          >
            <AddIcon />
            Create new
          </Button>
        </Box>
        <Button onClick={importBot} variant="contained" color="secondary">
          <ImportIcon />
          Import
        </Button>
      </Box>
      <Box>
        <BotTable />
      </Box>
    </>
  );
};
