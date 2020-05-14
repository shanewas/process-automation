import React , { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function GenerateCodeModal(props) {


  const [name, setName] = useState("");

  
  useEffect(() => {
    setName(props.code)

},[props.code]);

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
          Selemium Code Generation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign:"center"}}>
        <form>
        <textarea rows="20" cols="50" readOnly={true} defaultValue={name}></textarea>
        </form>
        </div>
      </Modal.Body>

    </Modal>
  );
}
