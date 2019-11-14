import React from 'react';
import {
	Link,
	useRouteMatch
} from 'react-router-dom';
import { logout } from '../services/user';

function Navbar({ userId }) {
	const dashboardMatch = useRouteMatch({
		path: '/dashboard',
		strict: true
	});
	const homeMatch = useRouteMatch({
		path: '/home',
		strict: true
	});

	const onClickDashboardHandler = e => {
		if (!userId) {
			e.preventDefault();
		}
	};

	const getDashboardClassNames = () => {
		const classNames = ['nav-link'];

		if (dashboardMatch) {
			classNames.push('active');
		}

		if (!userId) {
			classNames.push('disabled');
		}

		return classNames.join(' ');
	};

	const onClickSignOutHandler = e => {
		e.preventDefault();

		logout();
	};

	return (
		<ul className="nav nav-pills mt-3 mb-5">
			<li className="nav-item">
				<Link className={ `nav-link${homeMatch ? ' active' : ''}` } to="/home">Home</Link>
			</li>
			<li className="nav-item">
				<Link className={ getDashboardClassNames() } onClick={ onClickDashboardHandler } to="/dashboard">Dashboard</Link>
			</li>

			{ userId
				? <li className="nav-item ml-auto">
					<button className="btn btn-link nav-link" onClick={ onClickSignOutHandler }>Sign Out</button>
				</li>
				: null }
		</ul>
	);
}

export default Navbar;
