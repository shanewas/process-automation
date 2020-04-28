import React, { Component } from 'react';
import DeleteBotModal from './DeleteBotModal';
import moment from 'moment';
import * as electron from "../../electronScript";


export default class BotTable extends Component {


  state = {
    botList:[],
    editmodalShow:false,
    deletemodalShow:false,
    startmodalShow:false,
    deletebotselect:null
}


deletebot = (bot) =>{
  this.setState({deletemodalShow:true,deletebotselect:bot})
}
editbot = () =>{
  this.setState({editmodalShow:true})
}
startbot = (botName) =>{
  electron.ipcRenderer.send(electron.startBotChannel, botName)
  this.setState({startmodalShow:true})
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


componentDidMount(){
  fetch('/api/bots')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    this.setState({
      botList:data
    })
  });
}

// editHandle = () => {
//   electron.ipcRenderer.send(electron.editBotChannel);
// }


render(){
  return (
    
    <div className="row">
    
      <DeleteBotModal
      bot={this.state.deletebotselect}
      show={this.state.deletemodalShow}
      onHide={() => this.setState({deletemodalShow:false})}
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
                <th scope="col">Status</th>
                <th scope="col">Bot Type</th>
                <th scope="col">Run Time</th>
                <th scope="col">Last Active</th>
                <th scope="col">Functions</th>


              </tr>
            </thead>
            <tbody>
            {this.state.botList.map((bot,i) =>{
              return(
                <tr key={i}>
                <td>{bot.botName}</td>
                <td>
                  <span className={this.badgemaker(bot.status)}>{bot.status}</span>
                </td>
                <td>{bot.category}</td>
                <td>{bot.runTime}</td>
                {/* MMMM Do YYYY at H:mm:ss a */}
                <td>{moment(bot.lastActive,"MMMM Do YYYY at H:mm:ss a").fromNow()}</td>
                <td>
                  <div>
                    <div className="btn btn-primary mr-2 btn-sm">
                      <div onClick={this.editbot}>
                      <i className="far fa-edit"></i> Edit
                      </div></div>
                    <div className="btn btn-danger mr-2 btn-sm">
                      <div onClick={()=>this.deletebot(bot)}>
                      <i className="far fa-trash-alt"></i> Delete
                      </div></div>
                      <div className="btn btn-success mr-2 btn-sm">
                        <div onClick={()=>this.startbot(bot.botName)}>
                      <i className="fas fa-running"></i> Start
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
