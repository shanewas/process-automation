import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MiniDrawer from '../navBar/MiniDrawer'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
export default class BotBuildPage extends Component {
    render() {
        return (
            <div style={{padding:"0 10vh"}}>
            <MiniDrawer></MiniDrawer>
            <Row className="show-grid">
                   <Col xs={12} md={12} lg={8} xl={8}>
                        <Card style={{marginTop:'7vh'}}>
                        <Card.Body>
                            <span><SearchIcon/></span><TextField style={{width:"100%"}} id="outlined-required"label="Required" variant="outlined"/>
                        </Card.Body>
                        </Card>
                   </Col>
                   <Col xs={12} md={12} lg={4} xl={4}>
                        <div style={{marginTop:'7vh'}}>
                            <Button variant="contained" color="primary">Flow Chart</Button> 
                             <Button variant="contained" color="secondary">Data Base</Button>
                        </div>
                   </Col>
               </Row>
               

               <div style={{marginTop:'5vh'}}>
               <Row className="show-grid">
                   <Col xs={12} md={12} lg={12} xl={12}>
                   <Card >
                   <Card.Body></Card.Body>
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
