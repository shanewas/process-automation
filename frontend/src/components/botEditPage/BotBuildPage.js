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
import GenerateCodeModal from './GenerateCodeModal'
import {selectBotAction,clearAllAction} from '../../Store/actions'
import {SeleniumCode} from '../../CodeGeneration'
import * as electron from "../../electronScript";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BotBuildPage extends Component {

  state={
    selectmodalShow:false,
    codeGenerationModal:false,
    code:"",
    changed:false
}

savebot =() =>{
 
  this.setState({selectmodalShow:true})
 
}

generateCode = () =>{
 
  var code= SeleniumCode(this.props.process,this.props.botIteration,this.props.filepath)

  this.setState({
    ...this.state,
    code:code
  },()=>{this.showCodeModal()})
 
}
showCodeModal = () =>{
  this.setState({
    ...this.state,
    codeGenerationModal:true
  })
}
selectBot = (botName) =>{
  let saveBotObject={}
  saveBotObject.botName=botName
  saveBotObject.filepath=this.props.filepath
  saveBotObject.headers=this.props.headers
  saveBotObject.status=this.props.status
  saveBotObject.botIteration=this.props.botIteration
  let process=this.props.process
  electron.ipcRenderer.send("update-bot-process", botName, process);
  electron.ipcRenderer.send("update-bot", botName, saveBotObject);
  this.botChanged(false)
}
botChanged = (change) =>{
  this.setState({
    saved:change
  })
}
runBot = () =>{
  if(!this.state.changed)
  {
  electron.ipcRenderer.send(electron.startBotChannel, this.props.botName)
  }
  else{
    toast.info('Please Save Bot First', {
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
componentWillUnmount(){

  this.props.clearProcess()

}

  render() {
    return (
      <div>
      <ToastContainer />
      <SelectBotModal show={this.state.selectmodalShow}
                onHide={() => this.setState({selectmodalShow:false})}
                selectbot={this.selectBot}
                />
        <GenerateCodeModal show={this.state.codeGenerationModal}
                onHide={() => this.setState({codeGenerationModal:false})} code={this.state.code}/>
        <Navbarup/>
        <SidebarLeft runBot={this.runBot} savebot={this.savebot} saveIteration={this.saveIteration} generateCode={this.generateCode}></SidebarLeft>

        <div>
          <Row>
          <SearchBar/>
          </Row>
          <Row style={{marginTop:"25vh",marginLeft:"30vh",marginRight:"5vh"}}>
          <Col xs={12} md={12} lg={6} xl={6} >
          <Flowchart/>         
          </Col>
          <Col xs={12} md={12} lg={6} xl={6} >
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
      botName:state.botName,
      headers:state.headers,
      status:state.status,
      filepath:state.filepath,
      botIteration:state.botIteration,

      
  }
}
const mapDispathtoProps=(dispatch)=>{
    return {
        selectBot:(bot)=> {dispatch(selectBotAction(bot))},
        clearProcess:()=>{dispatch(clearAllAction())},

    }
} 
export default connect(mapStateToProps,mapDispathtoProps)(BotBuildPage)