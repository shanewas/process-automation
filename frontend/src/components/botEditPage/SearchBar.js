import React, { Component } from "react";
import * as electron from "../../electronScript";

export default class SearchBar extends Component {
	state = {
		link: "",
	};

	handleChange = (e) => {
		this.setState({
			link: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("form submitted", this.state);
		electron.send(electron.SearchLinkChannel, this.state.link);
	};

	test = (e) => {
		electron.receive(electron.SearchLinkChannel);
	};

	render() {
		this.test();
		return (
			<div>
				<form onSubmit={this.handleSubmit} className='searchBox'>
					<input
						onChange={this.handleChange}
						className='searchInput'
						type='text'
						placeholder='Search...'
					/>
					<button className='searchButton'>
						<i className='large material-icons'>search</i>
					</button>
				</form>
			</div>
		);
	}
}
