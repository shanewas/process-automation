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
import { useDispatch } from "react-redux";
import { removeStep } from "../../Store/actions";
import { ModalContext } from "../../context/ModalContext";

const initStepMenu = {
  anchorEl: null,
  idx: null,
};
export default (props) => {
  const [stepMenu, setStepMenu] = useState(initStepMenu);
  const { setCurrentModal } = useContext(ModalContext);
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

  return (
    <>
      {props.steps.length ? (
        props.steps.map((step, idx) => (
          <StepCard
            selectedVariable={props.selectedVariable}
            selected={props.selectedStep === idx}
            selectStep={props.selectStep}
            openMenu={(e) => openMenuHandler(e, idx)}
            idx={idx}
            key={step.id}
            {...step}
          />
        ))
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
