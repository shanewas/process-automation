import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import { Warning } from "@material-ui/icons";

export default class SidebarLeft extends Component {
  itarationchange = (e) => {
    this.props.saveIteration(e.target.value);
  };

  ocr = (e) => {
    e.preventDefault();
    this.props.ocr();
  };

  render() {
    return (
      <div className="left side-menu" style={{ width: "260px" }}>
        <div className="slimscroll-menu" id="remove-scroll">
          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <Box display="flex" justifyContent="space-between" pr={1}>
                <li className="menu-title">Functions</li>
                {this.props.showBtn && (
                  <Button
                    onClick={this.props.showWarnings}
                    size="small"
                    variant="contained"
                    elevation={0}
                    color="secondary"
                    style={{ fontSize: "14px", textTransform: "capitalize" }}
                  >
                    <Warning style={{ fontSize: "16px", marginRight: "5px" }} />
                    Warning
                  </Button>
                )}
              </Box>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-mouse-pointer fa-2x" />
                  <span>
                    Click{" "}
                    <kbd>
                      <kbd>shift</kbd> + <kbd>click</kbd>
                    </kbd>{" "}
                  </span>
                </a>
              </li>
              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-clipboard fa-2x mr-1" />
                  <span>
                    Load Data{" "}
                    <kbd>
                      <kbd>shift</kbd> + <kbd>click</kbd>
                    </kbd>{" "}
                  </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="far fa-keyboard mr-3 fa-2x" />
                  <span>
                    Keyboard{" "}
                    <kbd>
                      <kbd>shift</kbd> + <kbd>key</kbd>
                    </kbd>{" "}
                  </span>
                </a>
              </li>

              <li>
                <a href="index.html" className="waves-effect">
                  <i className="fas fa-camera mr-1 fa-2x" />
                  <span>
                    {" "}
                    ScreenShot{" "}
                    <kbd>
                      <kbd>shift</kbd> + <kbd>T</kbd>
                    </kbd>
                  </span>
                </a>
              </li>

              <li>
                <a onClick={this.ocr} href="/" className="waves-effect">
                  <i className="fas fa-eye mr-1 fa-2x" /> <span>OCR </span>
                </a>
              </li>

              <li className="menu-title">Actions</li>

              <li>
                <div
                  onClick={this.props.openBotSaveModal}
                  className="waves-effect p-3"
                >
                  <i className="fas fa-save mr-1 fa-2x" />
                  <span> Save Bot </span>
                </div>
              </li>
              <li>
                <div
                  onClick={this.props.openGenerateCodeModal}
                  className="waves-effect p-3"
                >
                  <i className="fas fa-code mr-1 fa-2x" />
                  <span> Generate Code </span>
                </div>
              </li>
              <li>
                <div onClick={this.props.runBot} className="waves-effect p-3">
                  <i className="fas fa-rocket mr-1 fa-2x" />
                  <span> Run Bot </span>
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
