import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import DataConditionsModal from "./DataConditionsModal/DataConditionsModal";

const Modals = {
  DataConditionsModal,
};

const ModalManager = (props) => {
  const { currentModal, setCurrentModal } = useContext(ModalContext);
  const handleClose = () => setCurrentModal(null);

  if (currentModal) {
    const ModalComponent = Modals[currentModal.name];
    return (
      <ModalComponent
        handleClose={handleClose}
        open={true}
        {...currentModal.props}
      />
    );
  }
  return null;
};

export default ModalManager;
