import React, { useState, useContext } from "react";
import StepCard from "./StepCard";
import {
  Box,
  ListItem,
  ListItemIcon,
  Menu,
  Typography,
} from "@material-ui/core";
import {
  RemoveCircle as RemoveIcon,
  EditRounded as EditIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeStep } from "../../Store/actions";
import { ModalContext } from "../../context/ModalContext";
import { Draggable, Droppable } from "react-beautiful-dnd";

const initStepMenu = {
  anchorEl: null,
  idx: null,
};
export default (props) => {
  const [stepMenu, setStepMenu] = useState(initStepMenu);
  const { setCurrentModal } = useContext(ModalContext);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

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
    dispatch(removeStep(stepMenu.idx));
    setStepMenu(initStepMenu);
  };

  console.log({ steps: props.steps });

  return (
    <>
      {props.steps.length ? (
        <Droppable droppableId="steps-flowchart" type="FLOWCHART">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {props.steps.map((step, idx) => (
                <Draggable
                  key={step.id}
                  draggableId={`fc-${step.id}`}
                  index={idx}
                >
                  {(provided) => (
                    <StepCard
                      selectedErrorStep={props.errorStep === step.id}
                      haveError={errors[step.id]?.message}
                      selectedHeader={props.selectedHeader}
                      selectedVariable={props.selectedVariable}
                      selectedVariable={props.selectedVariable}
                      selected={props.selectedSteps.includes(idx)}
                      selectSteps={props.selectSteps}
                      openMenu={(e) => openMenuHandler(e, idx)}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      ref={provided.innerRef}
                      idx={idx}
                      {...step}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
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
