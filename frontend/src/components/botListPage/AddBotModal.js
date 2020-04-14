import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function AddBotModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Bot
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
            Bot Name
          </label>
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control"
          />
          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
            Bot Category
          </label>
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
