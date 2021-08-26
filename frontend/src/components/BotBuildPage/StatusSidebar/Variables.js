import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
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
}));

export default (props) => {
  const classes = useStyles();
  const { setCurrentToastr } = useContext(ModalContext);
  const [variable, setVariable] = useState("");
  const [value, setValue] = useState("");
  const variables = useSelector((state) => state.variables);
  const dispatch = useDispatch();

  const handleCreateVariable = () => {
    dispatch(createVariable({ name: variable, value }));
    setVariable("");
    setValue("");
  };

  const handleRemoveVariable = (variable) => {
    // const varToRemove = variables.find((v) => v.name === variableName);
    // if (varToRemove.associatedWith.length) {
    //   return setCurrentToastr({
    //     msg: "Cannot delete this variable as it is connected to step(s)",
    //   });
    // }
    // check if being used
    dispatch(removeVariable(variable));
  };
  return (
    <Box>
      <Box>
        <Box mb={2}>
          <TextField
            style={{ marginBottom: "16px" }}
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Variable name"
          />
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Initial Value (Optional)"
          />
        </Box>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleCreateVariable}
        >
          Create
        </Button>
      </Box>

      <Box my={4}>
        <Divider />
      </Box>
      {Object.entries(variables).map(([variable, value]) => (
        <Box
          onClick={() =>
            props.selectedVariable === variable.name
              ? props.selectVariable("")
              : props.selectVariable(variable.name)
          }
          key={variable}
          className={`${classes.variable} ${
            props.selectedVariable === variable.name && "active"
          }`}
        >
          <Box className={classes.variableName}>
            {"{{"} {variable} {"}}"}
          </Box>
          <Box display="flex" alignItems="center">
            <DeletIcon
              onClick={() => handleRemoveVariable(variable)}
              className={classes.icon}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
