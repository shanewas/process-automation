import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  Mouse as ClickICon,
  Keyboard as KeyboardIcon,
  Save as LoadDataIcon,
  Camera as ScreenshotIcon,
} from "@material-ui/icons";

const shortcuts = [
  {
    text: "CLICK",
    Icon: ClickICon,
    shortcut: "Shift + Click",
  },
  {
    text: "LOAD DATA",
    Icon: LoadDataIcon,
    shortcut: "Shift + Click",
  },
  {
    text: "KEYBOARD",
    Icon: KeyboardIcon,
    shortcut: "Shift + key",
  },
  {
    text: "SCREENSHOT",
    Icon: ScreenshotIcon,
    shortcut: "Shift + T",
  },
];

export default ({ open, handleClose, code, saveCode }) => {
  return (
    <Dialog fullWidth open={open}>
      <Box
        px={2}
        py={1.5}
        bgcolor="#2E2F35"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color="#fff"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box mr={2}>
            <KeyboardIcon />
          </Box>
          <Typography variant="h6">Keyboard Shortcuts</Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon size={16} />
          </IconButton>
        </Box>
      </Box>

      <DialogContent>
        <Box py={2}>
          {shortcuts.map(({ text, Icon, shortcut }, idx) => (
            <>
              <Box
                key={shortcut.text}
                my={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                color="#fff"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  fontWeight={700}
                  fontSize="16px"
                  textTransform="uppercase"
                >
                  <Box mr={2}>
                    <Icon />
                  </Box>
                  {text}
                </Box>
                <Typography>{shortcut}</Typography>
              </Box>
              {idx + 1 !== shortcuts.length && (
                <Box my={3}>
                  <Divider />
                </Box>
              )}
            </>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
