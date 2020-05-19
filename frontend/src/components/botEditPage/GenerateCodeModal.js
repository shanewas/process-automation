import React , { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as electron from "../../electronScript";
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
        <button type="button" className="btn btn-success" onClick={()=>{electron.ipcRenderer.send("code-generation", props.code)}}>Generate Code</button>
        </div>
      </Modal.Body>

    </Modal>
  );
}
