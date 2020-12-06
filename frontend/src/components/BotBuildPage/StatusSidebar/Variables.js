import React, { useContext, useState } from "react";
import { Box, Button, makeStyles, TextField, Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createVariable, removeVariable } from "../../../Store/actions";
import { Delete as DeletIcon } from "@material-ui/icons";
import { ModalContext } from "../../../context/ModalContext";

const useStyles = makeStyles((theme) => ({
  variable: {
    fontFamily: "Fira Code",
    fontWeight: 500,
    color: theme.palette.secondary.main,
    padding: theme.spacing(2),
    backgroundColor: "#000",
    marginBottom: theme.spacing(2),
    transition: ".3s",
    borderRadius: theme.spacing(0.5),
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "&:hover": {
      boxShadow: "0px 0px 10px rgba(116, 227, 206, 0.55)",
    },
    "&:active, &.active": {
      boxShadow: "0px 0px 20px rgba(116, 227, 206, 0.75)",
    },
  },
  variableName: {
    display: "inline-block",
    maxWidth: "125px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    color: "#CFCFCF",
  },
  associatedWith: {
    width: "25px",
    height: "auto",
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
    fontWeight: 700,
    borderRadius: "4px",
    textAlign: "center",
  },
}));

export default (props) => {
  const classes = useStyles();
  const { setCurrentToastr } = useContext(ModalContext);
  const [variable, setVariable] = useState("");
  const variables = useSelector((state) => state.variables);
  const dispatch = useDispatch();

  const handleCreateVariable = () => {
    dispatch(createVariable(variable));
    setVariable("");
  };

  const handleRemoveVariable = (variableName) => {
    const varToRemove = variables.find((v) => v.name === variableName);
    if (varToRemove.associatedWith.length) {
      return setCurrentToastr({
        msg: "Cannot delete this variable as it is connected to step(s)",
      });
    }
    // check if being used
    dispatch(removeVariable(variableName));
  };
  return (
    <Box>
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box mr={2} width="85%">
          <TextField
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Variable name"
          />
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreateVariable}
        >
          Create
        </Button>
      </Box>
      {variables.map((variable) => (
        <Box
          onClick={() =>
            props.selectedVariable === variable.name
              ? props.selectVariable("")
              : props.selectVariable(variable.name)
          }
          key={variable.name}
          className={`${classes.variable} ${
            props.selectedVariable === variable.name && "active"
          }`}
        >
          <Box className={classes.variableName}>
            {"{{"} {variable.name} {"}}"}
          </Box>
          <Box display="flex" alignItems="center">
            <Tooltip
              title={`Associated with ${variable.associatedWith.length} step(s)`}
            >
              <Box className={classes.associatedWith} mr={2}>
                {variable.associatedWith.length}
              </Box>
            </Tooltip>
            <DeletIcon
              onClick={() => handleRemoveVariable(variable.name)}
              className={classes.icon}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
