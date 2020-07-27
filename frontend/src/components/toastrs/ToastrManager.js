import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Snackbar } from "@material-ui/core";

const ToastrManager = (props) => {
  const { currentToastr, setCurrentToastr } = useContext(ModalContext);
  const onClose = () => setCurrentToastr({});

  return (
    <Snackbar
      open={!!Object.keys(currentToastr).length}
      autoHideDuration={3000}
      message={currentToastr.msg}
      onClose={onClose}
    />
  );
};

export default ToastrManager;
