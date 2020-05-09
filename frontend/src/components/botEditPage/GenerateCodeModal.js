import React , { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function GenerateCodeModal(props) {


  const [name, setName] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      props.onHide()
  }
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Selemium Code Generation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign:"center"}}>
        <form onSubmit={handleSubmit}>
        <textarea rows="20" cols="50">{name}</textarea>
        </form>
        </div>
      </Modal.Body>

    </Modal>
  );
}
