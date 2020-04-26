import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default function SelectBotModal(props) {
        
        const [bots, setBots] = useState([]);
        const [selectedbot, setSelectedBot] = useState("");
        const handleSubmit = (evt) => {
            evt.preventDefault();
            props.selectbot(selectedbot)
            props.onHide()
      
        }

        useEffect(() => {
            fetch('/api/bots')
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setBots(data)
            });
        },[]);

    return (
            <div>
                <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                Please Select Bot
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
            <select className="form-control" onChange={(e)=>{setSelectedBot(e.target.selectedOptions[0].value)}}>
                        <option>Select Bot</option>
                        { bots.map((bot,i)=>{
                            return(
                            <option key={i}>{bot.botName}</option>
                            )
                        })
                        }
                    </select>
            <Button className="mt-4 btn btn-success float-right" type="submit" >Save</Button>

            </form>
            </Modal.Body>

            </Modal>
            </div>
        )
    
}
