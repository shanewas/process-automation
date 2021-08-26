import React, { Component } from "react";

import logo from "../../images/logo.png";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitform = (e) => {
    e.preventDefault();

    if (this.verifyToken()) {
      this.setState({
        redirect: true,
      });
    }
  };

  verifyToken() {
    // Token verification from the cloud will go here
    return true;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/list" />;
    }
    return (
      <div>
        <div>
          {/* Begin page */}
          <div className="accountbg" />

          <div className="wrapper-page">
            <div className="card card-pages shadow-none">
              <div className="card-body">
                <div className="text-center m-t-0 m-b-15">
                  <a href="index.html" className="logo logo-admin">
                    <img src={logo} alt="" width={70} />
                  </a>
                </div>
                <h5 className="font-18 text-center">
                  Sign in to continue to AIW Core.
                </h5>
                <form
                  className="form-horizontal m-t-30"
                  onSubmit={this.submitform}
                >
                  <div className="form-group">
                    <div className="col-12">
                      <label>Username</label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Username"
                        name="username"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <div className="checkbox checkbox-primary">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            {" "}
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-primary btn-block btn-lg waves-effect waves-light"
                        type="submit"
                        id="test"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
