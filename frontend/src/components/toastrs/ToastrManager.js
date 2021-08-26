import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Snackbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: (props) => (props.success ? "#61BD4F" : "#EA8103"),
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
  },
});

const ToastrManager = (props) => {
  const { currentToastr, setCurrentToastr } = useContext(ModalContext);
  const classes = useStyles({ success: !!currentToastr.success });
  const onClose = () => setCurrentToastr({});

  return (
    <Snackbar
      ContentProps={{
        className: classes.snackbar,
      }}
      anchorOrigin={currentToastr.anchorOrigin}
      open={!!Object.keys(currentToastr).length}
      autoHideDuration={5000}
      message={currentToastr.msg}
      onClose={onClose}
    />
  );
};

export default ToastrManager;
