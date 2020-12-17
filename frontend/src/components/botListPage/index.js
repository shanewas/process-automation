import React, { useContext } from "react";
import { Box, Button, Typography } from "@material-ui/core";

import {
  CloudUploadRounded as ImportIcon,
  AddCircleRounded as AddIcon,
} from "@material-ui/icons";
import BotTable from "./BotTable";
import * as electron from "../../electronScript";
import { ModalContext } from "../../context/ModalContext";

export default (props) => {
  const { setCurrentModal } = useContext(ModalContext);
  const importBot = () => {
    electron.ipcRenderer.send(electron.importBot);
  };

  const openNewBotModal = (name) =>
    setCurrentModal({
      name: "NewBotModal",
    });

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
          <Button onClick={openNewBotModal} variant="contained" color="primary">
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
