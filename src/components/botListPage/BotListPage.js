import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MiniDrawer from '../navBar/MiniDrawer';
import BotTable from './BotTable';

export default class BotListPage extends Component {
    render() {
        return (
            <div style={{padding:"0 10vh"}}>
             <MiniDrawer></MiniDrawer>
               
                <Card style={{marginTop:'7vh'}}>
                <Card.Body><h1>Titile Would Go there</h1></Card.Body>
                </Card>

                <div style={{marginTop:'5vh'}}>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                    <Card >
                    <Card.Body><BotTable></BotTable></Card.Body>
                    </Card>
                    </Col>
                    <Col xs={6} md={4}>
                    <Card >
                    <Card.Body><h1>Analytics will go here</h1></Card.Body>
                    </Card>
                    </Col>
                </Row>
                </div>
                   
            </div>
        )
    }
}
