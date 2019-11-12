import React from 'react';
import { Link } from 'react-router-dom';

function DashboardGamesList({ title, games }) {
	if (!games.length) {
		return null;
	}

	return (
		<>
			<hr/>

			<h5 className="card-title">{ title }</h5>
			<div className="btn-group-vertical d-block">
				{ games.map(name => (
					<Link className="btn btn-primary" to={ `/game/${name}` } key={ name }>{ name }</Link>
				)) }
			</div>
		</>
	);
}

export default DashboardGamesList;
