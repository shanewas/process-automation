import React, { useEffect, useState, useContext } from "react";
import StepCard from "./StepCard";
import {
  Box,
  Chip,
  ListItem,
  ListItemIcon,
  Menu,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Tooltip,
  Popover,
  ButtonGroup,
  MenuItem,
} from "@material-ui/core";
import {
  RemoveCircle as RemoveIcon,
  EditRounded as EditIcon,
  HighlightOff as CancelIcon,
  AddCircle as AddIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToGroup, removeStep } from "../../Store/actions";
import { ModalContext } from "../../context/ModalContext";
import { Draggable, Droppable } from "react-beautiful-dnd";

const initStepMenu = {
  anchorEl: null,
  idx: null,
};

// Terms for groups
// grp - Limited to this component
// group - can be outside

const useStyles = makeStyles((theme) => ({
  processSelectedBar: {
    position: "fixed",
    bottom: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    backgroundColor: "#5EADF7",
    color: "black",
    padding: theme.spacing(1.5, 3),
    display: "flex",
    alignItems: "center",
    borderRadius: "50px",
    width: "440px",
    transition:
      "bottom 1s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform .2s ease-in-out",

    "&.show": {
      bottom: "40px",
    },
    "&.pulse": {
      transform: "translateX(-50%) scale(1.05)",
    },
  },
  btn: {
    borderRadius: "50px",
    color: "white",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  chip: {
    color: "white",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.3)",
  },
}));

export default (props) => {
  const classes = useStyles();
  const [addToGrpBtnEl, setAddToGrpBtnEl] = useState(null);
  const [showExistingGrps, setShowExistingGrps] = useState(false);
  const [selectedForGroup, setSelectedForGroup] = useState([]);
  const [pulse, setPulse] = useState(false);
  const [stepMenu, setStepMenu] = useState(initStepMenu);
  const { setCurrentModal, setCurrentToastr } = useContext(ModalContext);
  const errors = useSelector((state) => state.errors);
  const { groups, process } = useSelector(({ groups, process }) => ({
    groups,
    process,
  }));
  const dispatch = useDispatch();

  const openAddtoGrp = (e) => setAddToGrpBtnEl(e.currentTarget);

  const addToNewGrp = () =>
    setCurrentModal({
      name: "ProcessGroupModal",
      props: {
        processes: selectedForGroup,
        clearUp: () => setSelectedForGroup([]),
      },
    });

  const addToExistingGroup = (grpName) => {
    if (
      groups[grpName].processes.some(
        (processId) => selectedForGroup.indexOf(processId) >= 0
      )
    )
      return setCurrentToastr({
        msg: `${
          selectedForGroup.length > 1
            ? "Group cannot contain duplicate processes."
            : "The process is already in the group"
        }`,
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });

    dispatch(addToGroup(grpName, selectedForGroup));
    setSelectedForGroup([]);
    setShowExistingGrps(false);
    setAddToGrpBtnEl(null);
    return setCurrentToastr({
      msg: `Processes added to the ${grpName}`,
      anchorOrigin: { horizontal: "center", vertical: "top" },
      success: true,
    });
  };

  useEffect(() => {
    if (selectedForGroup.length === 1) return;
    setPulse(true);
    const timerId = setTimeout(() => setPulse(false), 200);
    return () => clearTimeout(timerId);
  }, [selectedForGroup.length]);

  const handleCheckbox = (processId) =>
    selectedForGroup.includes(processId)
      ? setSelectedForGroup((old) => old.filter((id) => id !== processId))
      : setSelectedForGroup((old) => [...old, processId]);

  const openMenuHandler = (e, idx) => setStepMenu({ anchorEl: e.target, idx });

  const openProcessConfigModal = () => {
    setCurrentModal({
      name: "ProcessConfigModal",
      props: {
        stepIdx: stepMenu.idx,
      },
    });
    setStepMenu(initStepMenu);
  };

  const handleRemoveStep = () => {
    for (const groupName in groups) {
      if (groups[groupName].processes.includes(process[stepMenu.idx].id))
        return setCurrentToastr({
          msg: `Cannot delete the process. As it is a part of '${groupName}' group`,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
    }
    dispatch(removeStep(stepMenu.idx));
    setStepMenu(initStepMenu);
  };

  const addStep = (idx) =>
    setCurrentModal({
      name: "AddStepModal",
      props: {
        idx,
      },
    });

  return (
    <>
      {props.steps.length ? (
        <>
          <Droppable droppableId="steps-flowchart" type="PROCESSES">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {props.steps.map((step, idx) => (
                  <Draggable
                    key={step.id}
                    draggableId={`fc-${step.id}`}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <StepCard
                        handleCheckbox={() => handleCheckbox(step.id)}
                        selectedForGroup={selectedForGroup.includes(step.id)}
                        selectedErrorStep={props.errorStep === step.id}
                        haveError={errors[step.id]?.message}
                        selectedVariable={props.selectedVariable}
                        selected={props.selectedSteps.includes(step.id)}
                        selectSteps={props.selectSteps}
                        openMenu={(e) => openMenuHandler(e, idx)}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        ref={provided.innerRef}
                        beingDragged={snapshot.isDragging}
                        idx={idx}
                        addStepBefore={() => addStep(idx)}
                        addStepAfter={() => addStep(idx + 1)}
                        {...step}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Box
            className={`${classes.processSelectedBar} ${
              selectedForGroup.length ? "show" : ""
            }  ${pulse ? "pulse" : ""}`}
          >
            <Box mr={1.25}>
              <Tooltip title="Clear all">
                <IconButton
                  onClick={() => setSelectedForGroup([])}
                  color="inherit"
                  size="small"
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Chip
              className={classes.chip}
              size="small"
              label={selectedForGroup.length}
            />
            <Box ml={1} mr="auto">
              <Typography variant="subtitle1">
                Process{selectedForGroup.length > 1 ? "es" : ""} selected
              </Typography>
            </Box>
            <Button
              onClick={openAddtoGrp}
              startIcon={<AddIcon />}
              className={classes.btn}
              disableElevation
              size="medium"
              variant="contained"
            >
              Add to group
            </Button>

            <Popover
              onClose={() => setShowExistingGrps(false)}
              open={!!addToGrpBtnEl && showExistingGrps}
              anchorEl={addToGrpBtnEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box
                width="180px"
                overflow="hidden"
                text-overflow="ellipsis"
                p={2}
              >
                {Object.keys(groups).length ? (
                  Object.keys(groups).map((grpName) => (
                    <MenuItem
                      key={grpName}
                      onClick={() => addToExistingGroup(grpName)}
                    >
                      {grpName}
                    </MenuItem>
                  ))
                ) : (
                  <Typography>No groups found. Create one</Typography>
                )}
              </Box>
            </Popover>
            <Popover
              onClose={() => setAddToGrpBtnEl(null)}
              open={!!addToGrpBtnEl && !showExistingGrps}
              anchorEl={addToGrpBtnEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <ButtonGroup color="secondary">
                <Button onClick={() => setShowExistingGrps(true)}>
                  Existing
                </Button>
                <Button onClick={addToNewGrp}>New</Button>
              </ButtonGroup>
            </Popover>
          </Box>
        </>
      ) : (
        <Box textAlign="center">
          <Typography variant="h6">
            Enter a URL and start recording steps
          </Typography>
        </Box>
      )}
      <Menu
        onClose={() => setStepMenu(initStepMenu)}
        open={Boolean(stepMenu.anchorEl)}
        anchorEl={stepMenu.anchorEl}
      >
        <ListItem button onClick={openProcessConfigModal}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit Step
        </ListItem>
        <ListItem button onClick={handleRemoveStep}>
          <ListItemIcon>
            <RemoveIcon />
          </ListItemIcon>
          Remove Step
        </ListItem>
      </Menu>
    </>
  );
};
