import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import {connect} from "react-redux"
import {loadHeaderAction,ChangeHeaderAction} from '../../Store/actions'

 class DatasetLoader extends Component {



    handleChange = (e) =>{
        
        this.props.loadHeaders()
    }

    changestatus = (index) =>{
        this.props.changeHeader(index)

    }

    render() {  
        if(this.props.headers.length === 0)
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
                            {this.props.datasets.map((dataset,index) =>{
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
            return(
                <div>
                    <Card style={{height:"70vh"}}>
                    <div style={{margin:"3vh",textAlign:"center"}}>
                    <h2 className="mb-4">DataSet Columns</h2>
                    {this.props.headers.map((header,index) =>{
                        if(this.props.status[index]==="notSelected")
                        {
                            return(
                                <div  key={index} onClick={() => this.changestatus(index)}>
                                <h3><span className="badge badge-danger text-center">{index+1}.  {header}</span></h3>
                                </div>
                                )   
                        }
                        else if (this.props.status[index]==="changing")
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
                                <h3><span className="badge badge-success text-center">{index+1}.  {header}</span></h3>
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

const mapStateToProps=(state)=>{
    return{
        datasets:state.datasets,
        headers:state.headers,
        status:state.status,

    }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        loadHeaders:()=> {dispatch(loadHeaderAction())},
        changeHeader:(index)=> {dispatch(ChangeHeaderAction(index))},
    }
} 

export default connect(mapStateToProps,mapDispathtoProps)(DatasetLoader)