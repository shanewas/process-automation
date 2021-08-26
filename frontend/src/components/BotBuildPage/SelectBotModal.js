import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as electron from "../../electronScript";

export default function SelectBotModal(props) {
  const [Loading, setLoading] = useState(false);
  const [bots, setBots] = useState([]);
  const [CreateNew, setCreateNew] = useState(false);
  const [Selectexisting, setSelectexisting] = useState(false);
  const [selectedbot, setSelectedBot] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    props.selectbot(selectedbot);
    setTimeout(() => {
      setLoading(false);
      customHide();
    }, 1500);
  };
  const customHide = () => {
    props.onHide();
    setLoading(false);
    setSelectexisting(false);
    setCreateNew(false);
  };

  const handleSubmitNewBot = (evt) => {
    evt.preventDefault();
    setLoading(true);
    electron.ipcRenderer.invoke("add-bot", name, category).then(async () => {
      await props.selectbot(name);
    });
    setTimeout(() => {
      customHide();
    }, 1000);
  };

  useEffect(() => {
    electron.ipcRenderer.invoke("bots").then((data) => {
      setBots(data);
    });
  }, []);

  if (Loading) {
    return (
      <div>
        <Modal
          show={props.show}
          onHide={customHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>Please Wait</Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <div className="spinner-grow text-primary center">
              <h1 className="sr-only">Loading...</h1>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  } else if (Selectexisting) {
    return (
      <div>
        <Modal
          show={props.show}
          onHide={customHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>Please Select Bot</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <select
                className="form-control"
                onChange={(e) => {
                  setSelectedBot(e.target.selectedOptions[0].value);
                }}
              >
                <option>Select Bot</option>
                {bots.map((bot, i) => {
                  return <option key={i}>{bot.botName}</option>;
                })}
              </select>
              <Button
                className="mt-4 btn btn-success float-right"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  } else if (CreateNew) {
    return (
      <Modal
        show={props.show}
        onHide={customHide}
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
          <form onSubmit={handleSubmitNewBot}>
            <label className="grey-text">Bot Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="grey-text">Bot Category</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <div>
        <Modal
          show={props.show}
          onHide={customHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            Please select a Bot where you want to save:
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setCreateNew(true);
                }}
                className="mt-4 btn btn-primary ml-5 mr-5"
                type="submit"
              >
                Create New
              </Button>
              <Button
                onClick={() => {
                  setSelectexisting(true);
                }}
                className="mt-4 btn btn-primary ml-5 mr-5"
                type="submit"
              >
                Select Existing Bot
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
