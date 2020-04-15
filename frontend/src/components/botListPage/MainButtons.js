import React, { Component } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"

export default class MainButtons extends Component {
    render() {
        return (
            <div>
                <Row>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div class="mini-stat-icon mainbutton ">
                    <i class="mdi mdi-robot bg-primary text-white mr-4 "></i>
                    <span style={{fontSize:"4vh"}}>Add Bot</span>
                </div>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div class="mini-stat-icon mainbutton">
                    <i class="mdi mdi-account-card-details-outline bg-primary text-white mr-4 "></i>
                    <span style={{fontSize:"4vh"}}>License</span>
                </div>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div class="mini-stat-icon mainbutton">
                    <i class="mdi mdi-database-plus bg-primary text-white mr-4 "></i>
                    <span style={{fontSize:"3.7vh"}}>Database</span>
                </div>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div class="mini-stat-icon mainbutton">
                    <i class="mdi mdi-information bg-primary text-white mr-4 "></i>
                    <span style={{fontSize:"4vh"}}>About</span>
                </div>
                </Card>
                </Col>
                </Row>

            </div>
        )
    }
}
