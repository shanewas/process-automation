import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import * as electron from "../../electronScript";
import { connect } from 'react-redux';
import { UseHeaderAction, UnselectHeaderAction, SendProcessAction ,editProcessAction} from '../../Store/actions';


class Flowchart extends Component {


    componentDidMount()
	{
		electron.ipcRenderer.on(electron.ProcessLinkChannel,(e, content) =>{
            
            this.props.sendProcess(content)
            
        });


    }
    areotherusing=(index,header)=>{
        var newprocess=[...this.props.process]
        for(var x=0;x<newprocess.length;x++)
        {
            if(x!==index)
            {
                if(newprocess[x].dataHeader===header)
                {
                    return true
                }
            }
        }
        return false

    }
    insertHeader = (index) =>{
        var newprocess=[...this.props.process]
        if("dataHeader" in newprocess[index] && !this.areotherusing(index,newprocess[index].dataHeader))
        {   
            this.props.UnselectHeader(newprocess[index].dataHeaderindex)
        }
        newprocess[index].dataHeader=this.props.headers[this.props.selectedHeaderIndex]
        newprocess[index].dataHeaderindex=this.props.selectedHeaderIndex
        this.setState({
            process:newprocess
        })
        this.props.useHeaders()
    }
    
    render() {

        if(this.props.process.length===0)
        {
            return (
                <div>
                    <Card style={{height:"70vh",paddingTop:"20vh"}}>
                    <h2 className="text-center">No FlowChart has been created</h2>
                    </Card>
                </div>
            )
        }
        else 
        {
            return (
                <div>
                    <Card id="scrollstyle" style={{height:"70vh",maxHeight:"70vh",overflowY:"auto"}}>

                        {this.props.process.map((step,index)=>{
                        
                        if (index===0)
                        {
                            
                            return(    
                                <div key={index} className=" text-white bg-primary text-center mr-5 ml-5 mb-2 mt-5 p-3">
                                    Opened Webpage {step.link}
                                </div>
                                )
                                
                        }
                        else
                        {
                            if(step._type==='click')
                            {
                                return(    
                                    <div key={index}>
                                    <div style={{textAlign:"center"}} >
                                    <i className="fas fa-arrow-down fa-2x"></i> 
                                    </div>
                                    <div style={{backgroundColor:"#eddb66"}} className="m-b-30 text-white bg text-center mr-5 ml-5 mb-2 mt-2 p-3">
                                       Clicked on the boutton {step.value}
                                    </div>
                                    </div>
                                    )
                            }
                            else if(step._type==="LoadData"){
                                return(    
                                    <div key={index}  onClick={() => this.insertHeader(index)}>
                                    <div style={{textAlign:"center"}} >
                                    <i className="fas fa-arrow-down fa-2x"></i> 
                                    </div>
                                    <div style={{backgroundColor:"#a044b3"}} className="m-b-30 text-white bg text-center mr-5 ml-5 mb-2 mt-2 p-3">
                                        Load Data {step.placeholder}
                                        <br/>
                                        {("dataHeader" in step?
                                        <span style={{float:"right"}} className="badge badge-lg badge-pill badge-success">{step.dataHeader}</span>
                                        :
                                        <h6><span style={{float:"right"}} className="badge badge-pill badge-danger">No Data Selected</span></h6>
                                        )}
                                    
                                    </div>
                                    </div>
                                    )
                            }
                            else {
                                return <div></div>
                            }
                            
                        }
                        })}
                    </Card>
                </div>
            )
        }
        
    }
}


const mapStateToProps=(state)=>{
    return{
        process:state.process,
        headers:state.headers,
        selectedHeaderIndex:state.selectedHeader,
    }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        sendProcess:(process)=> {dispatch(SendProcessAction(process))},
        editProcess:(process)=> {dispatch(editProcessAction(process))},
        useHeaders:()=> {dispatch(UseHeaderAction())},
        UnselectHeader:(index)=> {dispatch(UnselectHeaderAction(index))}

    }
} 

export default connect(mapStateToProps,mapDispathtoProps)(Flowchart)