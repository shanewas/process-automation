import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import processTypes from "../../BotBuildPage/utils/processTypes";

const useStyles = makeStyles((theme) => ({
  ptOption: {
    cursor: "pointer",
    transition: ".2s",

    "&.selected": {
      backgroundColor: "white",
      color: "#000",
    },

    "&:hover": {
      backgroundColor: "white",
      color: "#000",
    },
  },
}));

const AddStepModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [selectedStep, setSelectedStep] = useState("");

  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Add Step</Grid>
          <Grid item>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(processTypes).map((pt) => {
            const processType = processTypes[pt];
            return (
              <Grid item xs={4} key={pt}>
                <Box
                  className={`${classes.ptOption} ${
                    selectedStep === pt ? "selected" : ""
                  } `}
                  onClick={() => setSelectedStep(pt)}
                  py={1}
                  px={2}
                  border={`1px solid rgba(255,255,255,.2)`}
                  borderRadius={4}
                  display="flex"
                  alignItems="center"
                >
                  {processType.Icon}
                  <Typography
                    style={{ textTransform: "capitalize", marginLeft: 10 }}
                  >
                    {pt}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box ml={1}>
          <Button disabled={!selectedStep} variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddStepModal;
