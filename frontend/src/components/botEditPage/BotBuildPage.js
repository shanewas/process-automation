import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "./SearchBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"
import Flowchart from "./Flowchart";
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
          <Col xs={12} md={12} lg={9} xl={9} >
          <Flowchart></Flowchart>
          
          </Col>
          <Col xs={12} md={12} lg={3} xl={3} >
          <Card style={{height:"70vh"}}>
          <h2 className="text-center">No Dataset</h2>
          </Card>
          
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}
