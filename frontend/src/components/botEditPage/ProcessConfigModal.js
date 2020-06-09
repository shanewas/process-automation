import React , {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ProcessConfigModal(props) {

    let [process, setProcess] = useState(null);

    const customHide = () =>{
        props.onHide()
        setProcess(null)
        props.clearConfig()
    }

    useEffect(() => {
        setProcess(props.step)
    },[props.step]);
    

    const changeType = (e) =>{
        let newprocess={...process}
        newprocess["_type"]=e.target.value
        setProcess(newprocess)    
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        props.editStep(process)
        customHide()
    }

    const handleChange= (e) =>{
        let newprocess={...process}
        let name=e.target.name
        if(name.includes("ext"))
        {
            var splitName=name.split("-")
            var ext={}
            ext[splitName[1]]=e.target.value
            newprocess["ext"]=ext
        }
        else
        {
        newprocess[e.target.name]=e.target.value
        }
        setProcess(newprocess)  
        
    }
    
    if(process)
    {
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
                Process Configuration
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                <label htmlFor="processType">Process Type:</label>
                <select id="processType" className="form-control" defaultValue={props.step._type} onChange={changeType}>
                    <option value="LoadData">LoadData</option>
                    <option value="link">Link</option>
                    <option value="click">Click</option>
                </select>
                {
                    process._type==="link"?
                    <div className="mt-1">
                       <label htmlFor="Link">Link:</label> 
                       <input className="form-control"defaultValue={process.link} onChange={handleChange} name="link"/>
                    </div>:<div></div>
                }
                {
                    process._type==="click"?
                    <div className="mt-1">
                        <label htmlFor="Link">Xpath:</label> 
                        <input className="form-control"defaultValue={process.xpath} onChange={handleChange} name="xpath"/>
                        <label htmlFor="Link">Value:</label> 
                        <input className="form-control"defaultValue={process.value} onChange={handleChange} name="value"/>
                        <label htmlFor="Link">placeholder:</label> 
                        <input className="form-control"defaultValue={process.placeholder} onChange={handleChange} name="placeholder"/>
                        <label htmlFor="Link">Label:</label> 
                        {/* change this when ext is removed */}
                        {process.ext?
                        <input className="form-control"defaultValue={process.ext.label} onChange={handleChange} name="ext-label"/>
                        :
                        <input className="form-control"defaultValue={process.label}onChange={handleChange} name="label"/>
                        }
                    </div>:<div></div>
                }
                {
                    process._type==="LoadData"?
                    <div className="mt-1">
                        <label htmlFor="Link">Xpath:</label> 
                        <input className="form-control"defaultValue={process.xpath} onChange={handleChange} name="xpath"/>
                        <label htmlFor="Link">Value:</label> 
                        <input className="form-control"defaultValue={process.value} onChange={handleChange} name="value"/>
                        <label htmlFor="Link">placeholder:</label> 
                        <input className="form-control"defaultValue={process.placeholder} onChange={handleChange} name="placeholder"/>
                        <label htmlFor="Link">Label:</label> 
                        <input className="form-control"defaultValue={process.ext.label} onChange={handleChange} name="ext-label"/>
                        { process.dataHeader? <div>
                        <label htmlFor="Link">Data Collumn:</label>
                        <input className="form-control"defaultValue={process.dataHeader} onChange={handleChange} name="dataHeader"/>
                        <label htmlFor="Link">Data Collumn Number:</label> 
                        <input className="form-control"defaultValue={process.dataHeaderindex} onChange={handleChange} name="dataHeaderindex"/>
                        </div> : <div>
                        <label htmlFor="Link">Manual Data Entry:</label>
                        <input className="form-control"defaultValue={process.MenualData} onChange={handleChange} name="MenualData"/>
                        </div> }

                        
                    </div>:<div></div>
                }
                <Button className="mt-4 ml-3 btn btn-danger float-right" onClick={()=>{customHide()}} >Cancel</Button>
                <Button className="mt-4 float-right" type="submit">Apply</Button>
                </form>
            </Modal.Body>
    
            </Modal>
        );
    }
    else{
        return(
        <div></div>
        )
    }

    
}
