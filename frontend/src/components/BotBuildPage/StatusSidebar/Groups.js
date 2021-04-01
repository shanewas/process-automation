import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { ModalContext } from "../../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { Droppable } from "react-beautiful-dnd";
import { removeFromGroup } from "../../../Store/actions";
import { mapProcessesOfGroups } from "../utils/grouping";

const useStyles = makeStyles((theme) => ({
  color: {
    height: "15px",
    width: "15px",
    borderRadius: "50px",
    marginRight: "12px",
  },
  heading: {
    textTransform: "capitalize",
  },
  vCenter: {
    display: "flex",
    alignItems: "center",
  },
  iteration: {
    borderRadius: "3px",
    width: "25px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(2),
  },
}));

export default (props) => {
  const { setCurrentModal, setCurrentToastr } = useContext(ModalContext);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { groups, process } = useSelector(({ groups, process }) => ({
    groups,
    process,
  }));

  const tGroups = mapProcessesOfGroups(process, groups);
  const openCreateGroupModal = (groupName = null) =>
    setCurrentModal({ name: "ProcessGroupModal", props: { groupName } });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    isExpanded
      ? props.selectSteps(groups[panel].processes)
      : props.selectSteps([]);
    setExpanded(isExpanded ? panel : false);
  };

  const removeProcess = (groupName, processId) => {
    props.selectSteps([]);
    dispatch(removeFromGroup(groupName, processId));
    setCurrentToastr({
      msg: `Process removed from the group ${groupName}`,
      success: true,
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
  };

  return (
    <>
      <Button
        onClick={openCreateGroupModal}
        fullWidth
        variant="contained"
        color="primary"
      >
        Create new
      </Button>
      <Box mt={4}>
        {Object.entries(tGroups).map(
          ([groupName, { color, processes, iteration }]) => (
            <Droppable
              type="PROCESSES"
              key={groupName}
              droppableId={`group-${groupName}`}
            >
              {(provided, snapshot) => (
                <Accordion
                  expanded={snapshot.isDraggingOver || expanded === groupName}
                  onChange={handleAccordionChange(groupName)}
                  style={
                    snapshot.isDraggingOver
                      ? {
                          boxShadow: `0px 0px 10px ${color}`,
                          transition: ".3s",
                        }
                      : {}
                  }
                  ref={provided.innerRef}
                >
                  <AccordionSummary
                    classes={{
                      root: classes.heading,
                      content: classes.vCenter,
                    }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Box
                      className={classes.color}
                      style={{ backgroundColor: color }}
                    />
                    <Typography>{groupName}</Typography>
                    <Box
                      mr="auto"
                      className={classes.iteration}
                      border={`1px solid ${color}`}
                      color={color}
                    >
                      {iteration}
                    </Box>
                    <EditIcon
                      onClick={() => openCreateGroupModal(groupName)}
                      fontSize="small"
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width="100%" display="flex" flexDirection="column">
                      {processes.length ? (
                        processes.map((p, idx) => (
                          <Box
                            py={1}
                            px={1.5}
                            mb={1}
                            borderRadius="4px"
                            bgcolor="#121212"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            key={p.id}
                          >
                            <Typography>
                              {idx + 1}. {p.title}
                            </Typography>
                            <IconButton
                              onClick={() => removeProcess(groupName, p.id)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))
                      ) : (
                        <Box
                          p={1.5}
                          width="100%"
                          border="1px solid rgba(247, 245, 245,.2)"
                          borderRadius="4px"
                          color="#eee"
                          textAlign="center"
                        >
                          <Typography>Empty Group</Typography>
                          <Typography variant="body2">
                            Drag and Drop steps in here.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </AccordionDetails>
                  <span style={{ display: "none" }}>
                    {provided.placeholder}
                  </span>
                </Accordion>
              )}
            </Droppable>
          )
        )}
      </Box>
    </>
  );
};
