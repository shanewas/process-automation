import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  ClickAwayListener,
  Button,
  makeStyles,
  FilledInput,
  IconButton,
} from "@material-ui/core";

import {
  Timer as TimerIcon,
  Check as CheckIcon,
  ArrowBack as BackIcon,
  AddCircleOutline as AddIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    left: "80px",
    width: "310px",
    height: "270px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  pgWrapper: {
    height: "200px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "0px",
      background: "transparent",
    },
  },
  processGroup: {
    border: "1px solid #c4c6c8",
    borderRadius: "5px",
    color: "#c4c6c8",
    textAlign: "center",
    padding: "6px",
    marginBottom: theme.spacing(0.5),
    fontSize: "14.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",

    "&:hover": {
      color: "#363636",
      borderColor: "#363636",
      cursor: "pointer",
    },
  },
  color: {
    height: "20px",
    width: "20px",
    borderRadius: "100px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default React.forwardRef((props, ref) => {
  const [isNew, setIsNew] = useState(false);
  const [newGrpClr, setNewGrpClr] = useState("");
  const colors = ["#61BD4F", "#F2D600", "#FF9F1A", "#F56E5A", "#E195FE"];
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={props.closePopper}>
      <Paper className={classes.wrapper}>
        <Box className={classes.pgWrapper}>
          <Box mb={1} display="flex" alignItems="center">
            {isNew ? (
              <IconButton
                onClick={() => setIsNew(false)}
                size="small"
                style={{ marginRight: "10px" }}
              >
                <BackIcon size={24} />
              </IconButton>
            ) : null}
            <Typography variant="subtitle1">
              {isNew ? "New Group" : "Process Group"}
            </Typography>
          </Box>
          {!isNew ? (
            <>
              {props.processGroups.map((pg) => (
                <Box key={pg.id} className={classes.processGroup}>
                  <Box
                    mr={2}
                    className={classes.color}
                    style={{ backgroundColor: colors[pg.color] }}
                  ></Box>
                  <Box
                    mr={2}
                    width="120px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    textAlign="left"
                  >
                    {pg.name}
                  </Box>
                  <Box ml={2}>
                    <TimerIcon size={20} /> {pg.iteration}
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <>
              <FilledInput
                disableUnderline
                placeholder="Group name"
                fullWidth
              />
              <Box mt={1}>
                <FilledInput
                  disableUnderline
                  placeholder="Number of Iteration"
                  fullWidth
                />
              </Box>
              <Box mt={2} mb={1}>
                <Typography variant="caption">Group Color</Typography>
              </Box>
              <Box display="flex">
                {colors.map((clr) => (
                  <Box
                    onClick={() => setNewGrpClr(clr)}
                    m={0.5}
                    key={clr}
                    className={classes.color}
                    style={{ backgroundColor: clr }}
                  >
                    {newGrpClr === clr ? <CheckIcon size={18} /> : null}
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box mt={2}>
          <Button
            fullWidth
            variant={isNew ? "contained" : "outlined"}
            disableElevation
            color="primary"
            onClick={() => setIsNew(true)}
          >
            {isNew ? (
              "Create"
            ) : (
              <>
                <Box mr={1}>
                  <AddIcon color="primary" />
                </Box>
                New Group
              </>
            )}
          </Button>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
});
