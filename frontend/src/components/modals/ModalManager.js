import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import DataConditionsModal from "./DataConditionsModal/";
import BotDeleteModal from "./BotDeleteModal";
import BotSaveModal from "./BotSaveModal";
import GenerateCodeModal from "./GenerateCodeModal";
import ManualEntryModal from "./ManualEntryModal";

const Modals = {
  DataConditionsModal,
  BotDeleteModal,
  BotSaveModal,
  GenerateCodeModal,
  ManualEntryModal,
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
