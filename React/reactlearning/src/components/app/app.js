import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeersList from '../employeers-list/employeers-list';
import EmployeersAddForm from '../employeers-add-form/employeers-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{ name: 'Azat Shayakhmetov', salary: 10000, increase: true, like: false, id: 1 },
				{ name: 'Alina Shayakhmetova', salary: 9999, increase: true, like: false, id: 2 },
				{ name: 'Andrew Shtyrov', salary: 250, increase: false, like: true, id: 3 }
			],
			idIndex: 4,
			searchLine: '',
			filter: 'all'
		};
	}

	deleteDataElement = (id) => {
		this.setState(({ data }) => ({
			data: data.filter((item) => item.id !== id)
		}));
	};

	addDataElement = (name, salary) => {
		if (name.length >= 3 && +salary > 0) {
			this.setState(({ data, idIndex }) => ({
				data: [ ...data, { name: name, salary: salary, increase: false, like: false, id: idIndex } ],
				idIndex: idIndex + 1
			}));
		} else {
			console.log('Incorrect employee!');
		}
	};

	onToggle = (id, toggleItem) => {
		this.setState(({ data }) => ({
			data: data.map((item) => {
				if (item.id == id) {
					return { ...item, [toggleItem]: !item[toggleItem] };
				}
				return item;
			})
		}));
	};

	stringSearchData = (data, searchLine) => {
		if (searchLine.length === 0) {
			return data;
		}

		return data.filter((item) => {
			return item.name.indexOf(searchLine) > -1;
		});
	};

	getSearchLine = (searchLine) => {
		this.setState({ searchLine });
	};

	getFiltredData = (items, filter) => {
		switch (filter) {
			case 'like':
				return items.filter((item) => item.like);
			case 'moreThen1000':
				return items.filter((item) => item.salary > 1000);
			default:
				return items;
		}
	};

	onFilterSelect = (filter) => {
		this.setState({ filter });
	};

	render() {
		const { data, searchLine, filter } = this.state;
		const visibleData = this.getFiltredData(this.stringSearchData(data, searchLine), filter);

		return (
			<div className="app">
				<div className="container">
					<AppInfo
						dataLength={data.length}
						dataLikesLength={data.filter((item) => item.like === true).length}
					/>

					<div className="search-panel">
						<SearchPanel getSearchLine={this.getSearchLine} />
						<AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
					</div>

					<EmployeersList data={visibleData} onDelete={this.deleteDataElement} onToggle={this.onToggle} />

					<EmployeersAddForm onAdd={this.addDataElement} />
				</div>
			</div>
		);
	}
}

export default App;
