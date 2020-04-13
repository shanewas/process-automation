import React, { Component } from "react";

export default class SearchBar extends Component {
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", this.state);
  };
  state = {
    text: "",
  };

  render() {
    return (
      <div>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            name
            placeholder="Search..."
          />
          <button className="searchButton" href="/#">
            <i className="material-icons">search</i>
          </button>
        </div>
      </div>
    );
  }
}
