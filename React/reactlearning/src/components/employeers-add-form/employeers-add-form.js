import { Component } from 'react';

import './employeers-add-form.css';

class EmployeersAddForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			salary: ''
		};
	}

	onValueChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { onAdd } = this.props;
		const { name, salary } = this.state;
		onAdd(name, salary);
	};

	render() {
		const { name, salary } = this.state;

		return (
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form onSubmit={this.onSubmit} className="add-form d-flex">
					<input
						type="text"
						name="name"
						value={name}
						onChange={this.onValueChange}
						className="form-control new-post-label"
						placeholder="Как его зовут?"
					/>
					<input
						type="number"
						name="salary"
						value={salary}
						onChange={this.onValueChange}
						className="form-control new-post-label"
						placeholder="З/П в $?"
					/>

					<button type="submit" className="btn btn-outline-light">
						Добавить
					</button>
				</form>
			</div>
		);
	}
}

export default EmployeersAddForm;
