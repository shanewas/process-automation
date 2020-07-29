import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Snackbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: "#F03434",
  },
});

const ToastrManager = (props) => {
  const classes = useStyles();
  const { currentToastr, setCurrentToastr } = useContext(ModalContext);
  const onClose = () => setCurrentToastr({});

  return (
    <Snackbar
      ContentProps={{
        className: classes.snackbar,
      }}
      open={!!Object.keys(currentToastr).length}
      autoHideDuration={3000}
      message={currentToastr.msg}
      onClose={onClose}
    />
  );
};

export default ToastrManager;
