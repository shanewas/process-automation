import React, { Component } from "react";
import logo from "../../images/logo.png";
export class Login extends Component {
  render() {
    return (
      <div>
        <div>
          {/* Begin page */}
          <div className="accountbg" />
          <div className="home-btn d-none d-sm-block">
            <a href="index.html" className="text-white">
              <i className="fas fa-home h2" />
            </a>
          </div>
          <div className="wrapper-page">
            <div className="card card-pages shadow-none">
              <div className="card-body">
                <div className="text-center m-t-0 m-b-15">
                  <a href="index.html" className="logo logo-admin">
                    <img src={logo} alt="" width={50} />
                  </a>
                </div>
                <h5 className="font-18 text-center">
                  Sign in to continue to AIW Core.
                </h5>
                <form className="form-horizontal m-t-30" action="index.html">
                  <div className="form-group">
                    <div className="col-12">
                      <label>Username</label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Username"
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
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                  <div className="form-group row m-t-30 m-b-0">
                    <div className="col-sm-7">
                      <a href="pages-recoverpw.html" className="text-muted">
                        <i className="fa fa-lock m-r-5" /> Forgot your password?
                      </a>
                    </div>
                    <div className="col-sm-5 text-right">
                      <a href="pages-register.html" className="text-muted">
                        Create an account
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* END wrapper */}
          {/* jQuery  */}
          {/* App js */}
        </div>
      </div>
    );
  }
}

export default Login;
