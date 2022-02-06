import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchLine: ''
		};
	}

	getSearchLine = (e) => {
		const searchLine = e.target.value;
		this.setState({ searchLine });
		this.props.getSearchLine(searchLine);
	};

	render() {
		return (
			<input
				type="text"
				value={this.state.searchLine}
				onChange={this.getSearchLine}
				className="form-control search-input"
				placeholder="Search employeer"
			/>
		);
	}
}

export default SearchPanel;
