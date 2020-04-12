//akash115
import React, { Component } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div id="wrapper">
        <div className="topbar">
          <div className="topbar-left">
            <a href="index.html" className="logo logo-admin">
              <img src={logo} alt="" width={50} />
              <span className="logo-light">
                <i className="font-18 text-center" /> AIW Core
              </span>
              <span className="logo-sm">
                <i className="mdi mdi-camera-control" />
              </span>
            </a>
          </div>
          <nav className="navbar-custom">
            <ul className="navbar-right list-inline float-right mb-0">
              <li className="dropdown notification-list list-inline-item d-none d-md-inline-block">
                <Link className="nav-link waves-effect" to="/build">
                  <i className="fas fa-lg fa-lightbulb mr-2"></i>Create New
                </Link>
              </li>
              <li className="dropdown notification-list list-inline-item">
                <a
                  className="nav-link dropdown-toggle arrow-none waves-effect"
                  data-toggle="dropdown"
                  href="#"
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
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item active"
                    >
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
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
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
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
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
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
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
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
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
                    href="javascript:void(0);"
                    className="dropdown-item text-center notify-all text-primary"
                  >
                    View all <i className="fi-arrow-right" />
                  </a>
                </div>
              </li>
              <li className="dropdown notification-list list-inline-item">
                <div className="dropdown notification-list nav-pro-img">
                  <a
                    className="dropdown-toggle nav-link arrow-none nav-user"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <img
                      src="assets/images/users/user-4.jpg"
                      alt="user"
                      className="rounded-circle"
                    />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-account-circle" /> Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-wallet" /> Wallet
                    </a>
                    <a className="dropdown-item d-block" href="#">
                      <span className="badge badge-success float-right">
                        11
                      </span>
                      <i className="mdi mdi-settings" /> Settings
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-lock-open-outline" /> Lock screen
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item text-danger" href="#">
                      <i className="mdi mdi-power text-danger" /> Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="list-inline menu-left mb-0">
              <li className="float-left">
                <button className="button-menu-mobile open-left waves-effect">
                  <i className="mdi mdi-menu" />
                </button>
              </li>
              <li className="d-none d-md-inline-block">
                <form role="search" className="app-search">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search.."
                    />
                    <button type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
