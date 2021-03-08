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
import { useSelector } from "react-redux";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles({
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
});

export default (props) => {
  const { setCurrentModal } = useContext(ModalContext);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const { groups, process } = useSelector(({ groups, process }) => ({
    groups,
    process,
  }));
  const tGroups = {};

  const mapProcess = (id) => {
    for (const [idx, p] of process.entries()) {
      if (p.id === id) return { ...p, idx };
    }
  };

  Object.keys(groups).forEach(
    (name) =>
      (tGroups[name] = {
        ...groups[name],
        processes: groups[name].processes
          .map(mapProcess)
          .sort((a, b) => (a.idx < b.idx ? -1 : 1)),
      })
  );

  console.log("groups ", { tGroups, process });

  const openCreateGroupModal = () =>
    setCurrentModal({ name: "ProcessGroupModal" });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    isExpanded
      ? props.selectSteps(groups[panel].processes)
      : props.selectSteps([]);
    setExpanded(isExpanded ? panel : false);
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
        {Object.entries(tGroups).map(([name, { color, processes }]) => (
          <Droppable type="PROCESSES" key={name} droppableId={`group-${name}`}>
            {(provided, snapshot) => (
              <Accordion
                expanded={snapshot.isDraggingOver || expanded === name}
                onChange={handleAccordionChange(name)}
                style={
                  snapshot.isDraggingOver
                    ? {
                        boxShadow: `0px 0px 5px ${color}`,
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
                  <Typography>{name}</Typography>
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
                          <IconButton size="small">
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
                <span style={{ display: "none" }}>{provided.placeholder}</span>
              </Accordion>
            )}
          </Droppable>
        ))}
      </Box>
    </>
  );
};
