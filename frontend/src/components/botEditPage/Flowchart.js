import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import * as electron from "../../electronScript";
import { connect } from 'react-redux';
import { UseHeaderAction, UnselectHeaderAction } from '../../Store/actions';


class Flowchart extends Component {
    state={
        process:[],
        
    }

    componentDidMount()
	{
        const self = this;
		electron.ipcRenderer.on(electron.ProcessLinkChannel, function (e, content) {
			var joined = self.state.process.concat(content);
            self.setState({ process: joined })
            
        });


    }
    areotherusing=(index,header)=>{
        var newprocess=[...this.state.process]
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
        var newprocess=[...this.state.process]
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
        if(this.state.process.length===0)
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

                        {this.state.process.map((step,index)=>{
                        
                        if (index===0)
                        {
                            return(    
                                <div key={index} className=" text-white bg-primary text-center mr-5 ml-5 mb-2 mt-5 p-3" onClick={() => this.insertHeader(index)}>
                                    {step.tagName}
                                    <br/>
                                    {("dataHeader" in step?
                                    <span style={{float:"right"}} className="badge badge-pill badge-success">{step.dataHeader}</span>
                                    :
                                    null
                                    
                                    )}
                                </div>
                                )
                                
                        }
                        else
                        {
                            return(    
                                <div key={index}  onClick={() => this.insertHeader(index)}>
                                <div style={{textAlign:"center"}} >
                                <i className="fas fa-arrow-down fa-2x"></i> 
                                </div>
                                <div className="m-b-30 text-white bg-primary text-center mr-5 ml-5 mb-2 mt-2 p-3">
                                    {step.tagName}
                                    <br/>
                                    {("dataHeader" in step?
                                    <span style={{float:"right"}} className="badge badge-pill badge-success mb-3">{step.dataHeader}</span>
                                    :
                                    null
                                    
                                    )}
                                
                                </div>
                                </div>
                                )
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
        headers:state.headers,
        selectedHeaderIndex:state.selectedHeader,
    }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        useHeaders:()=> {dispatch(UseHeaderAction())},
        UnselectHeader:(index)=> {dispatch(UnselectHeaderAction(index))}

    }
} 

export default connect(mapStateToProps,mapDispathtoProps)(Flowchart)