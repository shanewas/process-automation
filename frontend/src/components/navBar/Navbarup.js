//akash115
import React, { Component } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearAllAction } from "../../Store/actions";
class Navbar extends Component {
  render() {
    return (
      <div id="wrapper">
        <div className="topbar">
          <div className="topbar-left">
            <Link to="/list" className="logo logo-admin">
              <img src={logo} alt="" width={50} />
              <span className="logo-light">
                <i className="font-18 text-center" /> AIW Core
              </span>
            </Link>
          </div>
          <nav className="navbar-custom">
            <ul className="navbar-right list-inline float-right mb-0">

            <li className="dropdown notification-list list-inline-item d-none d-md-inline-block">
                <Link className="nav-link waves-effect" to="/list">
                <i className="fas fa-home h2 pt-3" />
                </Link>
              </li>
            
            <li className="dropdown notification-list list-inline-item">
                <a
                  className="nav-link dropdown-toggle arrow-none waves-effect"
                  data-toggle="dropdown"
                  href="/#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-bell-outline noti-icon" />
                  <span className="badge badge-pill badge-danger noti-icon-badge">
                    3
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg px-1">
                  <h6 className="dropdown-item-text">Notifications</h6>
                  <div className="slimscroll notification-item-list">
                    <a href="/#" className="dropdown-item notify-item active">
                      <div className="notify-icon bg-success">
                        <i className="mdi mdi-cart-outline" />
                      </div>
                      <p className="notify-details">
                        <b>Your order is placed</b>
                        <span className="text-muted">
                          Dummy text of the printing and typesetting industry.
                        </span>
                      </p>
                    </a>
                    <a href="/#" className="dropdown-item notify-item">
                      <div className="notify-icon bg-danger">
                        <i className="mdi mdi-message-text-outline" />
                      </div>
                      <p className="notify-details">
                        <b>New Message received</b>
                        <span className="text-muted">
                          You have 87 unread messages
                        </span>
                      </p>
                    </a>
                    <a href="/#" className="dropdown-item notify-item">
                      <div className="notify-icon bg-info">
                        <i className="mdi mdi-filter-outline" />
                      </div>
                      <p className="notify-details">
                        <b>Your item is shipped</b>
                        <span className="text-muted">
                          It is a long established fact that a reader will
                        </span>
                      </p>
                    </a>
                    <a href="/#" className="dropdown-item notify-item">
                      <div className="notify-icon bg-success">
                        <i className="mdi mdi-message-text-outline" />
                      </div>
                      <p className="notify-details">
                        <b>New Message received</b>
                        <span className="text-muted">
                          You have 87 unread messages
                        </span>
                      </p>
                    </a>
                    <a href="/#" className="dropdown-item notify-item">
                      <div className="notify-icon bg-warning">
                        <i className="mdi mdi-cart-outline" />
                      </div>
                      <p className="notify-details">
                        <b>Your order is placed</b>
                        <span className="text-muted">
                          Dummy text of the printing and typesetting industry.
                        </span>
                      </p>
                    </a>
                  </div>
                  <a
                    href="/#"
                    className="dropdown-item text-center notify-all text-primary"
                  >
                    View all <i className="fi-arrow-right" />
                  </a>
                </div>
              </li>
             
              <li className="dropdown notification-list list-inline-item d-none d-md-inline-block">
                <Link className="nav-link waves-effect" to="/build/">
                  <i className="fas fa-lg fa-lightbulb mr-2"></i>Create New
                </Link>
              </li>
              <li className="dropdown notification-list list-inline-item d-none d-md-inline-block">
                <Link className="nav-link waves-effect" to="/">
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </Link>
              </li>
              
              
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
const mapDispathtoProps=(dispatch)=>{
  return {
      clearProcess:()=>{dispatch(clearAllAction())},

  }
} 
export default connect(null,mapDispathtoProps)(Navbar)