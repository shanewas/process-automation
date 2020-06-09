import React , { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function MenualEntryModal(props) {


  const [data, setData] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      props.insertMenualData(data)
      props.onHide();

  }
  

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
            Manual Entry Data ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            onChange={e => setData(e.target.value)}
          />
        <Button className="mt-4 mr-3 btn btn-danger" onClick={()=>{props.onHide()}}>Cancel</Button>
        <Button className="mt-4" type="submit">Apply</Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}
