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
      <div className="col-sm-12 col-md-6">
        <div id="datatable_filter" className="dataTables_filter">
          <label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Search..."
            />
            <button>Submit</button>
          </label>
        </div>
      </div>
    );
  }
}
