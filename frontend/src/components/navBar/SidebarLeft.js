import React, { Component } from "react";

export default class SidebarLeft extends Component {
  render() {
    return (
      <div className="left side-menu">
        <div className="slimscroll-menu" id="remove-scroll">
          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li className="menu-title">Functions</li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="icon-accelerator" />
                  <span className="badge badge-success badge-pill float-right">
                    9+
                  </span>{" "}
                  <span> Dashboard </span>
                </a>
              </li>
              <li>
                <a href="/#" className="waves-effect">
                  <i className="icon-mail-open" />
                  <span>
                    {" "}
                    Email{" "}
                    <span className="float-right menu-arrow">
                      <i className="mdi mdi-chevron-right" />
                    </span>{" "}
                  </span>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="email-inbox.html">Inbox</a>
                  </li>
                  <li>
                    <a href="email-read.html">Email Read</a>
                  </li>
                  <li>
                    <a href="email-compose.html">Email Compose</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="calendar.html" className="waves-effect">
                  <i className="icon-calendar" />
                  <span> Calendar </span>
                </a>
              </li>
              <li>
                <a href="/#" className="waves-effect">
                  <i className="icon-paper-sheet" />
                  <span>
                    {" "}
                    Pages{" "}
                    <span className="float-right menu-arrow">
                      <i className="mdi mdi-chevron-right" />
                    </span>{" "}
                  </span>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="pages-pricing.html">Pricing</a>
                  </li>
                  <li>
                    <a href="pages-invoice.html">Invoice</a>
                  </li>
                  <li>
                    <a href="pages-timeline.html">Timeline</a>
                  </li>
                </ul>
              </li>
              <li className="menu-title">Components</li>
              <li>
                <a href="/#" className="waves-effect">
                  <i className="icon-pencil-ruler" />{" "}
                  <span>
                    {" "}
                    UI Elements{" "}
                    <span className="float-right menu-arrow">
                      <i className="mdi mdi-chevron-right" />
                    </span>{" "}
                  </span>{" "}
                </a>
                <ul className="submenu">
                  <li>
                    <a href="ui-alerts.html">Alerts</a>
                  </li>
                  <li>
                    <a href="ui-badge.html">Badge</a>
                  </li>

                  <li>
                    <a href="ui-navs.html">Navs</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#" className="waves-effect">
                  <i className="icon-diamond" />{" "}
                  <span>
                    {" "}
                    Advanced UI{" "}
                    <span className="float-right menu-arrow">
                      <i className="mdi mdi-chevron-right" />
                    </span>{" "}
                  </span>{" "}
                </a>
                <ul className="submenu">
                  <li>
                    <a href="advanced-alertify.html">Alertify</a>
                  </li>
                  <li>
                    <a href="advanced-rating.html">Rating</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
