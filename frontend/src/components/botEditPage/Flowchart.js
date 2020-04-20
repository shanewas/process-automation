import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import * as electron from "../../electronScript";


export default class Flowchart extends Component {
    state={
        process:[]
    }

    componentDidMount()
	{
        const self = this;
		electron.ipcRenderer.on(electron.SearchLinkChannel, function (e, content) {
			var joined = self.state.process.concat(content);
            self.setState({ process: joined })
            
        });

        electron.ipcRenderer.on("test", function (e, content) {
			console.log("logging from",content)
            
        });



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
            console.log(this.state)
            return (
                <div>
                    <Card id="scrollstyle" style={{height:"70vh",maxHeight:"70vh",overflowY:"auto"}}>

                        {this.state.process.map((step,index)=>{
                        
                        if (index===0)
                        {
                            return(    
                                <div className="m-b-30 text-white bg-primary text-center mr-5 ml-5 mb-2 mt-5 p-3">
                                    {step.tagName}
                                </div>
                                )
                                
                        }
                        else
                        {
                            return(    
                                <div>
                                <div style={{textAlign:"center"}} >
                                <i className="fas fa-arrow-down fa-2x"></i> 
                                </div>
                                <div className="m-b-30 text-white bg-primary text-center mr-5 ml-5 mb-2 mt-2 p-3">
                                    {step.tagName}
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
