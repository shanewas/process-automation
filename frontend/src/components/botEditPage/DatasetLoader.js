import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import Dropzone from 'react-dropzone';
import {connect} from "react-redux"
import * as Papa from 'papaparse';
import {loadHeaderAction,ChangeHeaderAction, clearDatasetAction} from '../../Store/actions'

 class DatasetLoader extends Component {

    state = {
        file:null,
        dataLength:null
    }


    changestatus = (index) =>{
        this.props.changeHeader(index)

    }
    
    fileperse = (file) =>{
        
        let data=file[0]
        console.log(data)
        this.setState({
            ...this.state,
            file:data
        })
        let headers=null;
        Papa.parse(data, {
        complete: (results) =>{
            headers=results.data[0]
            this.setState({
                ...this.state,
                dataLength:results.data.length
            })
            this.props.loadHeaders(headers,data.path)
         
        }
        })
        
        
    }

    render() {  
        if(this.props.headers.length === 0)
        {
            return(
                <div>
                    
                        
                        <Dropzone accept=".csv" onDrop={acceptedFiles => this.fileperse(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Card style={{height:"70vh",paddingTop:"22vh"}}>
                            <div className="text-center">
                                <label className="h2 text-center mb-4">
                                No Dataset Selected
                                </label>    
                                <p>Drag & drop some files here, or click to select files</p>
                                </div>
                            </Card>
                            </div>
                            </section>
                           
                        )}
                        </Dropzone>
                 
                </div>
            )
        }
        else{
            return(
                <div>
                    <Card style={{height:"70vh"}}>
                    <div style={{margin:"3vh",textAlign:"center"}}>
                    <span><i className="fas fa-undo-alt float-right fa-2x" onClick={()=>{this.props.clearDataset()}}></i></span>
                    <h2 className="mb-4">DataSet Columns</h2>
                    {this.props.headers.map((header,index) =>{
                        if(this.props.status[index]==="notSelected")
                        {
                            return(
                                <div  key={index}>
                                <h3><button onClick={() => this.changestatus(index)} className=" btn btn-danger btn-lg text-center">{index+1}.  {header}</button></h3>
                                </div>
                                )   
                        }
                        else if (this.props.status[index]==="changing")
                        {
                            return(
                                <div  key={index}>
                                <h3><button onClick={() => this.changestatus(index)} className="btn btn-warning btn-lg text-center">{index+1}.  {header}</button></h3>
                                </div>
                                )   
                        }
                        else 
                        {
                            return(
                                <div  key={index}>
                                <h3><button onClick={() => this.changestatus(index)} className="btn btn-success btn-lg text-center">{index+1}.  {header}</button></h3>
                                </div>
                                )   
                        }
                        
                    })}    
                    </div>
                    <div className="m-5">
                    {/* <h6>File Name : {this.state.file.name} </h6>
                    <h6>File Size : {this.state.file.size/1000} kB</h6>
                    <h6>Number of Row : {this.state.dataLength-1}</h6>
                    <h6>File path : {this.state.file.path}</h6> */}
                    </div>
                    </Card>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return{
        datasets:state.datasets,
        headers:state.headers,
        status:state.status,
        // filename:state.filename
    }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        loadHeaders:(headers,path)=> {dispatch(loadHeaderAction(headers,path))},
        changeHeader:(index)=> {dispatch(ChangeHeaderAction(index))},
        clearDataset:()=> {dispatch(clearDatasetAction())},
    }
} 

export default connect(mapStateToProps,mapDispathtoProps)(DatasetLoader)