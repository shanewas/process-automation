import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "./SearchBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Flowchart from "./Flowchart";
import DatasetLoader from "./DatasetLoader";
export default class BotBuildPage extends Component {
  render() {
    return (
      <div>
        <Navbarup></Navbarup>
        <SidebarLeft></SidebarLeft>

        <div style={{ }}>
          <Row >
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
