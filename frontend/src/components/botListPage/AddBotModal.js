import React , { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AddBotModal(props) {


  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      fetch("http://localhost:9000/api/bots/add-bot", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botName: name,
          runTime: 1,
          botType: category,
        }),
      });
      props.onHide();
      window.location.reload();

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
          Add New Bot
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label className="grey-text">
            Bot Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={e => setName(e.target.value)}
          />
          <label className="grey-text">
            Bot Category
          </label>
          <input
            type="text"
            className="form-control"
            onChange={e => setCategory(e.target.value)}
          />
        <Button className="mt-4" type="submit" >Submit</Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}
