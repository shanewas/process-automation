import React, { Component } from 'react';
import * as electron from "../../electronScript"
import AddBotModal from './AddBotModal'

export default class BotTable extends Component {


  state = {
    botList:[],
    addmodalShow:false
}

addbot = () =>{
  this.setState({addmodalShow:true})
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

editHandle = () => {
  electron.ipcRenderer.send(electron.editBotChannel);
}


render(){
  return (
    
    <div className="row">
      <AddBotModal
      show={this.state.addmodalShow}
      onHide={() => this.setState({addmodalShow:false})}
      />
  <div className="col-xl-12">
    <div className="card">
      <div className="card-body">
        <h4 className="mt-0 header-title mb-4">Bot List
        <span onClick={this.addbot} className="float-right"><i className="fas fa-plus"></i></span>
        </h4>
        <div className="table-responsive">
          <table className="table table-hover">
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
            {this.state.botList.map((bot) =>{
              return(
                <tr key={bot.id}>
                <td>{bot.botName}</td>
                <td>
                  <span className={this.badgemaker(bot.status)}>{bot.status}</span>
                </td>
                <td>{bot.category}</td>
                <td>{bot.runTime}</td>
                <td>{bot.lastActive}</td>
                <td>
                  <div>
                    <div className="btn btn-primary mr-2 btn-sm">
                      <div onClick={this.editHandle}>
                      <i className="far fa-edit"></i> Edit
                      </div></div>
                    <div className="btn btn-danger mr-2 btn-sm"><div>
                      <i className="far fa-trash-alt"></i> Delete
                      </div></div>
                      <div className="btn btn-success mr-2 btn-sm"><div>
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
