import React from 'react';
import {
	Link,
	useRouteMatch
} from 'react-router-dom';

function Navbar() {
	const dashboardMatch = useRouteMatch({
		path: '/dashboard',
		strict: true
	});
	const homeMatch = useRouteMatch({
		path: '/home',
		strict: true
	});

	return (
		<ul className="nav nav-pills mt-3 mb-5">
			<li className="nav-item">
				<Link className={ `nav-link${homeMatch ? ' active' : ''}` } to="/home">Home</Link>
			</li>
			<li className="nav-item">
				<Link className={ `nav-link${dashboardMatch ? ' active' : ''}` } to="/dashboard">Dashboard</Link>
			</li>
		</ul>
	);
}

export default Navbar;
