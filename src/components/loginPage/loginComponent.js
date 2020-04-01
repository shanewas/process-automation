import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../navBar/NavBar";

export default class Login extends Component {
    
    state = {
        email:'',
        password:'',
        redirect: false
    }

    handleChange = e => {
        this.setState({
         [e.target.name]:e.target.value
       })}

    submitform = (e) =>{

        e.preventDefault();
         
        if (this.verifyToken())

        {
            this.setState({
                redirect:true
            })
        }
    }

    verifyToken(){

        // Token verification from the cloud will go here
        return true;
    }

    render() {
        if(this.state.redirect){
            return(<Redirect to='/list'/>)
        }
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <NavBar></NavBar>
            <form onSubmit={this.submitform}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" 
                    onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                </div>

                <button type="submit"  className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    
                </p>
            </form>

            </div>
            </div>
            
        );
    }
}