import { NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className="app__header">
			<h1 className="app__title">
				<NavLink to="/">
					<span>Marvel</span> information portal
				</NavLink>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<NavLink to="/" className={({ isActive }) => (isActive ? 'app__menu_active-link' : undefined)}>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink
							to="/comics"
							className={({ isActive }) => (isActive ? 'app__menu_active-link' : undefined)}
						>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
