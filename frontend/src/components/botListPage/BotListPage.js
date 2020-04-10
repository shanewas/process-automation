import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BotTable from './BotTable';

export default class BotListPage extends Component {
    render() {
        return (
            <div style={{padding:"0 10vh"}}>
               
                <Card style={{marginTop:'7vh'}}>
                <Card.Body><h1>Titile Would Go there</h1></Card.Body>
                </Card>

                <div style={{marginTop:'5vh'}}>
                <BotTable/>
          
                </div>
                   
            </div>
        )
    }
}
