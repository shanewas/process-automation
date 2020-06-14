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
      <div className="left side-menu" style={{width:"260px"}}>
        <div className="slimscroll-menu" id="remove-scroll">
          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li className="menu-title">Functions</li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-mouse-pointer fa-2x" />
                  <span>Click <kbd><kbd>shift</kbd> + <kbd>click</kbd></kbd>  </span>
                </a>
              </li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-clipboard fa-2x mr-1" />
                  <span>Load Data <kbd><kbd>shift</kbd> + <kbd>click</kbd></kbd> </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="far fa-keyboard mr-3 fa-2x" />
                  <span>Keyboard <kbd><kbd>shift</kbd> + <kbd>key</kbd></kbd> </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-camera mr-1 fa-2x" />
                  <span> ScreenShot <kbd><kbd>shift</kbd> + <kbd>T</kbd></kbd></span>
                </a>
              </li>
              
              <li className="menu-title">Actions</li>

              <li>
                <div onClick={this.save} className="waves-effect p-3">
                  <i className="fas fa-save mr-1 fa-2x" />
                  <span> Save Bot  </span>
                </div>
              </li>
              <li>
                <div onClick={this.generateCode} className="waves-effect p-3">
                  <i className="fas fa-code mr-1 fa-2x" />
                  <span> Generate Code  </span>
                </div>
              </li>
              <li>
                <div onClick={this.props.runBot} className="waves-effect p-3">
                  <i className="fas fa-rocket mr-1 fa-2x" />
                  <span> Run Bot  </span>
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
