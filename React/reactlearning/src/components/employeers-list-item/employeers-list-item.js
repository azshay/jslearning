import './employeers-list-item.css';

const EmployeersListItem = (props) => {
	const { name, salary, onDelete, increase, like, onToggle } = props;
	let classNames = 'list-group-item d-flex justify-content-between';

	if (increase) {
		classNames += ' increase';
	}

	if (like) {
		classNames += ' like';
	}

	return (
		<li className={classNames}>
			<span onClick={onToggle} className="list-group-item-label" data-toggle="like">
				{name}
			</span>
			<input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
			<div className="d-flex justify-content-center align-items-center">
				<button type="button" onClick={onToggle} className="btn-cookie btn-sm " data-toggle="increase">
					<i className="fas fa-cookie" />
				</button>

				<button onClick={onDelete} type="button" className="btn-trash btn-sm ">
					<i className="fas fa-trash" />
				</button>
				<i className="fas fa-star" />
			</div>
		</li>
	);
};

export default EmployeersListItem;
