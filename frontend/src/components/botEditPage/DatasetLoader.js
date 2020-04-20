import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import * as electron from "../../electronScript";

export default class DatasetLoader extends Component {

    state ={
        Datasets : ["Cradit Card data","Transaction data","ATM Data"],
        headers : [],
        status : []
    }

    handleChange = (e) =>{
        let headerExample=["Firstname","Lastname","Email id","Transaction Id","Date of birth"]
        const status = new Array(headerExample.length).fill("notSelected");
        this.setState({
            headers:headerExample,
            status:status
        })
    }

    changestatus = (index) =>{
        let newstatus=this.state.status
        newstatus[index]="changing"
        this.setState({
            status:newstatus
        })
        electron.ipcRenderer.send("test", newstatus[index]);

    }

    render() {  
        if(this.state.headers.length === 0)
        {
            return(
                <div>
                    <Card style={{height:"70vh",paddingTop:"22vh"}}>
                    <div className="text-center">
                        <label className="h2 text-center mb-4">
                        No Dataset Selected
                        </label>
                        <select className="form-control" style={{width:"20vh",margin:"auto"}} onChange={this.handleChange}>
                            <option value="" >Select your Dataset</option>
                            {this.state.Datasets.map((dataset,index) =>{
                                return(
                            <option key={index} value={dataset}>{dataset}</option>
                                )
                            })}
                        </select>
                    </div>
                    </Card>
                </div>
            )
        }
        else{
            // console.log(this.state)
            return(
                <div>
                    <Card style={{height:"70vh"}}>
                    <div style={{margin:"3vh",textAlign:"center"}}>
                    <h2 className="mb-4">DataSet Columns</h2>
                    {this.state.headers.map((header,index) =>{
                        if(this.state.status[index]==="notSelected")
                        {
                            return(
                                <div  key={index} onClick={() => this.changestatus(index)}>
                                <h3><span className="badge badge-danger text-center">{index+1}.  {header}</span></h3>
                                </div>
                                )   
                        }
                        else if (this.state.status[index]==="changing")
                        {
                            return(
                                <div  key={index} onClick={() => this.changestatus(index)}>
                                <h3><span className="badge badge-warning text-center">{index+1}.  {header}</span></h3>
                                </div>
                                )   
                        }
                        else 
                        {
                            return(
                                <div  key={index} onClick={() => this.changestatus(index)}>
                                <h3><span className="badge badge-primary text-center">{index+1}.  {header}</span></h3>
                                </div>
                                )   
                        }
                        
                    })}                    
                    </div>
                    </Card>
                </div>
            )
        }
    }
}
