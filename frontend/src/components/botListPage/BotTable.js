import React, { Component } from 'react';
import DeleteBotModal from './DeleteBotModal';
import moment from 'moment';
import * as electron from "../../electronScript";
import { connect } from 'react-redux';
import {loadBotAction,loadDatasetProperties} from '../../Store/actions'
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BotTable extends Component {


  state = {
    botList:[],
    build:false,
    deletemodalShow:false,
    deletebotselect:null

}

buildbot = (botName) =>{
  let filepath;
  let status;
  let header;
  let process;
  let iteration;
  let datasetProperties;
  Promise.all([
    electron.ipcRenderer.invoke("get-process", botName)
  .then((data) => {
    if(data)process=data 
    else process=[]
  }),
    electron.ipcRenderer.invoke("bot-name", botName)
  .then((data) => {
    iteration=data.botIteration
    // if there is dataset
    if(data.filepath){
      filepath=data.filepath
      status=data.status
      header=data.header
      let properties=electron.ipcRenderer.sendSync("file-analytics",filepath)
      datasetProperties=properties
    }else{
      filepath=null
      status=[]
      header=[]
    }
  })
  ])
  .then(()=>{
    let bot ={}
    bot['filepath']=filepath
    bot['botName']=botName
    bot['status']=status
    bot['header']=header
    bot['process']=process
    bot['iteration']=iteration
    this.props.loadBot(bot)
    this.props.loadDatasetProperties(datasetProperties)
    this.setState({
      build: true
    })
  })

}
startbot = (botName) =>{
  if(navigator.onLine)
  {
  electron.ipcRenderer.send(electron.startBotChannel, botName)
  this.updatetable()
  }
  else{
    toast.warning('No internet connection', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

badgemaker =(status) =>
{
  switch (status) {
    case "running":   return "badge badge-warning";
    case "active": return "badge badge-success";
    case "disabled":  return "badge badge-danger";
    default :return "badge badge-success"
  }
}

updatetable =()=>{
  electron.ipcRenderer.invoke("bots").then((result) => {
    this.setState({
      botList:result
    })
  }); 
}

componentDidMount(){
  this.updatetable()
}


render(){
  if(this.state.build) {
    return (<Redirect to="/build"></Redirect>)
  } 
  return (
    <div className="row">
      <ToastContainer style={{fontWeight:"bolder"}} />
      <DeleteBotModal
      bot={this.state.deletebotselect}
      show={this.state.deletemodalShow}
      onHide={() => this.setState({deletemodalShow:false})}
      updatetable={this.updatetable}
      />
  <div className="col-xl-12">
    <div className="card">
      <div className="card-body">
        <h4 className="mt-0 header-title mb-4">Bot List
        </h4>
        <div className="table-responsive">
          <table className="table table-hover" >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Last Active</th>
                <th scope="col">Functions</th>


              </tr>
            </thead>
            <tbody>
            {this.state.botList.map((bot,i) =>{
              return(
                <tr key={i}>
                <td>{bot.botName}</td>
                {/* <td>
                  <span className={this.badgemaker(bot.status)}>{bot.status}</span>
                </td>
                <td>{bot.category}</td>
                <td>{bot.runTime}</td> */}
                {/* MMMM Do YYYY at H:mm:ss a */}
                <td>{moment(bot.lastActive,"MMMM Do YYYY at H:mm:ss a").fromNow()}</td>
                <td>
                  <div>
                    <div className="btn btn-primary mr-2 btn-sm">
                      <div onClick={()=>{this.buildbot(bot.botName)}}>
                      <i className="fas fa-hammer"></i> Edit
                      </div></div>
                      <div className="btn btn-success mr-2 btn-sm">
                        <div onClick={()=>this.startbot(bot.botName)}>
                      <i className="fas fa-running"></i> Start
                      </div></div>
                      <div className="btn btn-danger mr-2 btn-sm">
                        <div onClick={()=>{this.setState({deletemodalShow:true,deletebotselect:bot})}}>
                      <i className="far fa-trash-alt"></i> Delete
                      </div></div>
                  </div>
                </td>
              </tr>
              )
              
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

);
}
  
}

const mapDispathtoProps=(dispatch)=>{
  return {
      loadBot:(bot)=> {dispatch(loadBotAction(bot))},
      loadDatasetProperties:(properties)=> {dispatch(loadDatasetProperties(properties))},

  }
} 

export default connect(null,mapDispathtoProps)(BotTable)