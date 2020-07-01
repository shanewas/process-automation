import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function BotConfigModal(props) {
  let [iteration, setiteration] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.saveIteration(iteration);
    props.onHide();
  };

  const itarationchange = (e) => {
    setiteration(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bot Configuration
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <span>
            {" "}
            Bot Iteration
            <i className="fas fa-recycle ml-2" />
            <input
              className="form-control"
              onChange={itarationchange}
              type="number"
              min={1}
              defaultValue={props.botIteration}
            />
          </span>
          <Button
            className="mt-4 mr-3 btn btn-danger float-right"
            onClick={() => {
              props.onHide();
            }}
          >
            Cancel
          </Button>
          <Button className="mt-4  mr-3 float-right" type="submit">
            Apply
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
