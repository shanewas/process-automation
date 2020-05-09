import React, { Component } from "react";

export default class SidebarLeft extends Component {

  save = () =>{
    this.props.savebot()
  }
  generateCode = () =>{
    this.props.generateCode()
  }
  itarationchange = (e) =>{
    this.props.saveIteration(e.target.value)
  }

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
                <div onClick={this.save} className="waves-effect p-3">
                  <i className="fas fa-save fa-2x mr-2" />
                  <span> Save Bot  </span>
                </div>
              </li>
              <li>
                <div onClick={this.generateCode} className="waves-effect p-3">
                  <i className="fas fa-code fa-2x mr-2" />
                  <span> Generate Code  </span>
                </div>
              </li>
              <li>
                <div className="waves-effect p-3">
                  <i className="fas fa-rocket fa-2x mr-2" />
                  <span> Run Bot  </span>
                </div>
              </li>
              <li>
                <div className="waves-effect p-3">
                  <i className="fas fa-history fa-2x mr-2 mb-4" />
                  <span> Bot Iteration  <input className="form-control" onChange={this.itarationchange} type="number" id="example-number-input"/></span>
                </div>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
