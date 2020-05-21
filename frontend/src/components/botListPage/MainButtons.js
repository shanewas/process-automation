import React, { Component } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"
import AddBotModal from './AddBotModal'
import { Link } from 'react-router-dom';


export default class MainButtons extends Component {

    state={
        addmodalShow:false,
    }

    addbot = () =>{
        this.setState({addmodalShow:true})
      }


    render() {
        return (
            <div>
                <AddBotModal
                show={this.state.addmodalShow}
                onHide={() => this.setState({addmodalShow:false})}
                />
                <Row>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <Link to="/build">
                    <div className="mini-stat-icon mainbutton text-center">
                        <i className="mdi mdi-robot bg-primary text-white mb-2 "></i>
                        <h2 style={{margin:"0px"}}>Add Bot</h2>
                    </div>
                </Link>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div className="mini-stat-icon mainbutton text-center">
                    <i className="mdi mdi-account-card-details-outline bg-primary text-white mb-2 "></i>
                    <h2 style={{margin:"0px"}}>License</h2>
                </div>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <Link to="/dataset">
                <div className="mini-stat-icon mainbutton text-center">
                    <i className="mdi mdi-database-plus bg-primary text-white mb-2"></i>
                    <h2 style={{margin:"0px"}}>Database</h2>
                </div>
                </Link>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={3} xl={3}>
                <Card  className="p-3">
                <div className="mini-stat-icon mainbutton text-center">
                    <i className="mdi mdi-information bg-primary text-white mb-2"></i>
                    <h2 style={{margin:"0px"}}>About</h2>
                </div>
                </Card>
                </Col>
                </Row>

            </div>
        )
    }
}
