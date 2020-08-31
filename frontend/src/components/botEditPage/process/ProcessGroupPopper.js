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
    marginBottom: theme.spacing(1),
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
  included: {
    color: "#363636",
    borderColor: "#363636",
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

const initInfo = { name: "", iteration: 0, color: "", processes: [] };

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [isNew, setIsNew] = useState(false);
  const [grpInfo, setGrpInfo] = useState(initInfo);
  const colors = ["#61BD4F", "#F2D600", "#FF9F1A", "#F56E5A", "#E195FE"];

  const handleChange = (e) => {
    e.persist();
    setGrpInfo((o) => ({ ...o, [e.target.name]: e.target.value }));
  };

  const createGroup = () => {
    props.editProcessGroup(grpInfo);
    setIsNew(false);
    setGrpInfo(initInfo);
  };

  const handlePgClick = (gid, processes) => {
    if (processes.includes(props.pid)) {
      if (window.confirm("Do you want to remove it from the Group?")) {
        props.removeFromProcessGroup({ gid, pid: props.pid });
      }
    } else {
      if (window.confirm("Do you want to add it to the group?")) {
        props.addToProcessGroup({ gid, pid: props.pid });
      }
    }
  };

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
              {Object.entries(props.processGroups).map((pg) => (
                <Box
                  key={pg[0]}
                  className={`${classes.processGroup} ${
                    pg[1].processes.includes(props.pid) && classes.included
                  }`}
                  onClick={() => handlePgClick(pg[0], pg[1].processes)}
                >
                  <Box
                    mr={2}
                    className={classes.color}
                    style={{ backgroundColor: colors[pg[1].color] }}
                  ></Box>
                  <Box
                    mr={2}
                    width="120px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    textAlign="left"
                  >
                    {pg[1].name}
                  </Box>
                  <Box ml={2}>
                    <TimerIcon size={20} /> {pg[1].iteration}
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <>
              <FilledInput
                onChange={handleChange}
                value={grpInfo.name}
                name="name"
                disableUnderline
                placeholder="Group name"
                fullWidth
              />
              <Box mt={1}>
                <FilledInput
                  value={grpInfo.iteration}
                  onChange={handleChange}
                  name="iteration"
                  disableUnderline
                  placeholder="Number of Iteration"
                  fullWidth
                />
              </Box>
              <Box mt={2} mb={1}>
                <Typography variant="caption">Group Color</Typography>
              </Box>
              <Box display="flex">
                {colors.map((color, idx) => (
                  <Box
                    onClick={() => setGrpInfo((o) => ({ ...o, color: idx }))}
                    m={0.5}
                    key={color}
                    className={classes.color}
                    style={{ backgroundColor: color }}
                  >
                    {grpInfo.color === idx ? <CheckIcon size={18} /> : null}
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box mt={2}>
          {!isNew ? (
            <Button
              fullWidth
              variant="outlined"
              disableElevation
              color="primary"
              onClick={() => setIsNew(true)}
            >
              <>
                <Box mr={1}>
                  <AddIcon color="primary" />
                </Box>
                Create new
              </>
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="primary"
              onClick={createGroup}
            >
              New Group
            </Button>
          )}
        </Box>

        {/* <Box mt={2}>
          <Button
            fullWidth
            variant={isNew ? "contained" : "outlined"}
            disableElevation
            color="primary"
            onClick={handleClick}
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
        </Box> */}
      </Paper>
    </ClickAwayListener>
  );
});
