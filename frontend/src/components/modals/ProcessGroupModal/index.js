import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  makeStyles,
  FilledInput,
} from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../../../context/ModalContext";
import { createGroup, editGroup } from "../../../Store/actions";

const colors = [
  "#61BD4F",
  "#F2D600",
  "#FF9F1A",
  "#F56E5A",
  "#E195FE",
  "#58FCEC",
  "#F9E7E7",
  "#EF626C",
];
const clrObj = {};
for (const c in colors)
  clrObj[`&.active&-${c}::before`] = { borderColor: colors[c] };

const useStyles = makeStyles({
  color: {
    height: "30px",
    width: "30px",
    borderRadius: "50px",
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",

    "&.active::before": {
      background: "none",
      borderRadius: "50px",
      border: "2px solid #fff",
      content: "''",
      display: "block",
      position: "absolute",
      top: "-4px",
      left: "-4px",
      right: "-4px",
      bottom: "-4px",
    },
    ...clrObj,
  },
});

const ProcessGroupModal = (props) => {
  const classes = useStyles();
  const { setCurrentToastr } = useContext(ModalContext);
  const dispatch = useDispatch();
  const groupToEdit = useSelector((state) => state.groups[props.groupName]);
  console.log({ groupToEdit });

  const [group, setGroup] = useState(
    groupToEdit
      ? { ...groupToEdit, name: props.groupName }
      : {
          name: "",
          iteration: "",
          color: "",
        }
  );

  const handleChange = (e) => {
    e.persist();
    const target = e.target;
    setGroup((o) => ({
      ...o,
      [target.name]:
        target.type === "number" && target.value !== ""
          ? target.valueAsNumber
          : target.value,
    }));
  };
  const groups = useSelector((state) => state.groups);

  const handleCreate = () => {
    const grpName = group.name.trim();
    if (!grpName || !group.color)
      return setCurrentToastr({
        msg: "Please enter a name and select a color",
      });
    if (Object.keys(groups).includes(group.name) && !groupToEdit)
      return setCurrentToastr({
        msg: "2 Groups cannot have the same name. Please enter another one.",
      });
    if (group.iteration < 1 || group.iteration > 99)
      return setCurrentToastr({
        msg: "Iteration count has to be more than 1 and less than 99",
      });
    const toSave = {
      name: grpName.toLowerCase(),
      color: group.color,
      iteration: group.iteration,
    };
    dispatch(groupToEdit ? editGroup(toSave) : createGroup(toSave));
    setCurrentToastr({
      msg: `Group ${groupToEdit ? "Updated" : "Created"}`,
      success: true,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    props.handleClose();
  };

  return (
    <Dialog fullWidth open={true}>
      <DialogTitle>
        {groupToEdit ? "Update Group" : "Create a new group"}
      </DialogTitle>
      <DialogContent>
        <Box>
          <FilledInput
            inputProps={{ maxLength: 12 }}
            value={group.name}
            name="name"
            onChange={handleChange}
            disableUnderline
            fullWidth
            placeholder="Group name"
            disabled={groupToEdit}
          />
          <Box my={4}>
            <FilledInput
              name="iteration"
              value={group.iteration}
              onChange={handleChange}
              disableUnderline
              fullWidth
              placeholder="Iteration count"
              type="number"
            />
          </Box>
          <Typography variant="h5">Color:</Typography>
          <Box mt={2} display="flex">
            {colors.map((clr, idx) => (
              <Box
                key={clr}
                onClick={() => setGroup((o) => ({ ...o, color: clr }))}
                className={`${classes.color} ${
                  group.color === clr ? `active ${classes.color}-${idx}` : ""
                }`}
                style={{ backgroundColor: clr }}
              >
                {group.color === clr && <CheckIcon />}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box pb={2}>
          <Button
            disableElevation
            style={{ marginRight: "12px" }}
            variant="contained"
            onClick={props.handleClose}
          >
            Close
          </Button>
          <Button
            onClick={handleCreate}
            disableElevation
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProcessGroupModal;
