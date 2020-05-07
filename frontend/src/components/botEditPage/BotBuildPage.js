import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "./SearchBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Flowchart from "./Flowchart";
import DatasetLoader from "./DatasetLoader";
import {connect} from "react-redux"
import SelectBotModal from "./SelectBotModal";
import {selectBotAction,clearAllAction} from '../../Store/actions'

class BotBuildPage extends Component {

  state={
    selectmodalShow:false,
}

savebot =() =>{
 
  this.setState({selectmodalShow:true})
 
}
selectBot = (botName) =>{
  let saveBotObject={}
  saveBotObject.botName=botName
  saveBotObject.filepath=this.props.filepath
  saveBotObject.headers=this.props.headers
  saveBotObject.status=this.props.status
  let process=this.props.process
  console.log(process)
  fetch("/api/bots/update-bot-process/"+botName, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process
        }),
      });
  fetch("/api/bots/update-bot/"+botName, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      saveBotObject
    }),
  });


}

componentWillUnmount(){

  this.props.clearProcess()

}
  render() {
    return (
      <div>
      <SelectBotModal show={this.state.selectmodalShow}
                onHide={() => this.setState({selectmodalShow:false})}
                selectbot={this.selectBot}
                />
        <Navbarup/>
        <SidebarLeft savebot={this.savebot}></SidebarLeft>

        <div>
          <Row>
          <SearchBar/>
          </Row>
          <Row style={{marginTop:"25vh",marginLeft:"30vh",marginRight:"5vh"}}>
          <Col xs={12} md={12} lg={7} xl={7} >
          <Flowchart/>         
          </Col>
          <Col xs={12} md={12} lg={5} xl={5} >
          <DatasetLoader/>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
      process:state.process,
      botName:state.BotName,
      headers:state.headers,
      status:state.status,
      filepath:state.filepath,
      

  }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        selectBot:(bot)=> {dispatch(selectBotAction(bot))},
        clearProcess:()=>{dispatch(clearAllAction())},


    }
} 
export default connect(mapStateToProps,mapDispathtoProps)(BotBuildPage)