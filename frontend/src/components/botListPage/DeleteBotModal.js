import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import redcross from '../../images/red-cross.png'
export default function DeleteBotModal(props) {

  const deletebot = e => { 
    fetch("http://localhost:9000/api/bots/remove-bot", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.target.id,
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
          </Modal.Header>
          <Modal.Body>
          
        <h4>
          <span className="mr-4"><img width="50px" alt="" src={redcross}></img></span>
          Are You sure you want to Delete 
          <span style={{color:"red",marginLeft:"10px"}}>{ props.bot!=null ?  props.bot.botName: null}</span> ?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" id={ props.bot!=null ?  props.bot.id: null} onClick={deletebot}>Yes</Button>
            <Button className="btn" onClick={props.onHide}>No</Button>
          </Modal.Footer>
        </Modal>
      );
}

