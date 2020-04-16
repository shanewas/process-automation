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
                  <i className="fas fa-mouse-pointer fa-2x mr-2" />
                  <span> Click  </span>
                </a>
              </li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-clipboard fa-2x mr-2" />
                  <span> Load Data  </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-question fa-2x mr-2" />
                  <span> If condition  </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-redo-alt fa-2x mr-2" />
                  <span> Loop  </span>
                </a>
              </li>
              
              <li className="menu-title">Actions</li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-calendar-check fa-2x mr-2" />
                  <span> Test Bot  </span>
                </a>
              </li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-code fa-2x mr-2" />
                  <span> Compile Bot  </span>
                </a>
              </li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-rocket fa-2x mr-2" />
                  <span> Run Bot  </span>
                </a>
              </li>
             
            </ul>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
