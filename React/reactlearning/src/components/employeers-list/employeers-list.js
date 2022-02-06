import EmployeersListItem from '../employeers-list-item/employeers-list-item';

import './employeers-list.css';

const EmployeersList = ({ data, onDelete, onToggle }) => {
	const elements = data.map((item) => {
		const { id, ...itemProps } = item;
		return (
			<EmployeersListItem
				onToggle={(e) => onToggle(id, e.currentTarget.getAttribute('data-toggle'))}
				onDelete={() => onDelete(id)}
				key={id}
				{...itemProps}
			/>
		); // name={item.name} salary={item.salary} => {...item}
	});

	return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeersList;
