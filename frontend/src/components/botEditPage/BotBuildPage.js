import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "../navBar/SearchBar";
export default class BotBuildPage extends Component {
  render() {
    return (
      <div>
        <Navbarup></Navbarup>
        <SidebarLeft></SidebarLeft>
        <div style={{ margin: "13vh 50vh" }}>
          <SearchBar />
        </div>
      </div>
    );
  }
}
