import React, { Component } from "react";
import Navbarup from "../navBar/Navbarup";
import SidebarLeft from "../navBar/SidebarLeft";
import SearchBar from "./SearchBar";
export default class BotBuildPage extends Component {
  render() {
    return (
      <div>
        <Navbarup></Navbarup>
        <SidebarLeft></SidebarLeft>
        <div style={{ margin: "13vh 10vh" }}>
          <SearchBar />
        </div>
      </div>
    );
  }
}
