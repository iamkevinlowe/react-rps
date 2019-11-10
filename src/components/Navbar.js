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
		<nav className="navbar navbar-expand navbar-light bg-light mb-5">
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav">
					<li className={ `nav-item${homeMatch ? ' active' : ''}` }>
						<Link className="nav-link" to="/home">Home</Link>
					</li>
					<li className={ `nav-item${dashboardMatch ? ' active' : ''}` }>
						<Link className="nav-link" to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
