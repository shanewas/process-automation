import React, { Component } from 'react';
import DeleteBotModal from './DeleteBotModal';
import moment from 'moment';
import * as electron from "../../electronScript";
import { connect } from 'react-redux';
import {loadBotAction} from '../../Store/actions'
import { Link } from "react-router-dom";

class BotTable extends Component {


  state = {
    botList:[],

}

buildbot = (botName) =>{
  console.log(botName)
  let filepath;
  let status;
  let header;
  let process;
  Promise.all([
     fetch('api/bots/get-process/'+botName)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    process=data
  }),
      fetch('api/bots/'+botName)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    filepath=data.filepath
    status=data.status
    header=data.header

  })
  ]).then(()=>{
    let bot ={}
    bot['filepath']=filepath
    bot['botName']=botName
    bot['status']=status
    bot['header']=header
    bot['process']=process
    this.props.loadBot(bot)

  })

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
                    <Link to="/build">
                    <div className="btn btn-primary mr-2 btn-sm">
                      <div onClick={()=>{this.buildbot(bot.botName)}}>
                      <i className="fas fa-hammer"></i> Build
                      </div></div>
                      </Link>
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

const mapDispathtoProps=(dispatch)=>{
  return {
      loadBot:(bot)=> {dispatch(loadBotAction(bot))},
  }
} 

export default connect(null,mapDispathtoProps)(BotTable)