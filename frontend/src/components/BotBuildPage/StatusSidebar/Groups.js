import React, { useContext } from "react";
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
  const classes = useStyles();
  const { groups, process } = useSelector(({ groups, process }) => ({
    groups,
    process,
  }));
  const tGroups = {};

  const mapProcess = (id) => process.find((p) => p.id === id);

  Object.keys(groups).forEach(
    (name) =>
      (tGroups[name] = {
        ...groups[name],
        processes: groups[name].processes.map(mapProcess),
      })
  );

  console.log("groups ", { tGroups });

  const openCreateGroupModal = () =>
    setCurrentModal({ name: "ProcessGroupModal" });

  // dummy: {
  //   color: "red",
  //   processes: [{...},{...}],
  // },

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
          <Accordion key={name}>
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
              {processes.map((p, idx) => (
                <Box
                  py={1}
                  px={1.5}
                  mb={1}
                  borderRadius="4px"
                  bgcolor="#121212"
                  width="100%"
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
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};
