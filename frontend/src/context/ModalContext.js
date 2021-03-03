import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const [currentModal, setCurrentModal] = useState({
    name: "ProcessGroupModal",
  });
  const [currentToastr, setCurrentToastr] = useState({});

  return (
    <ModalContext.Provider
      value={{ currentModal, setCurrentModal, currentToastr, setCurrentToastr }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
