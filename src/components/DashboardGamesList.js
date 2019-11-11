import React from 'react';
import { Link } from 'react-router-dom';

function DashbaordGamesList({ title, games }) {
	if (!Object.keys(games).length) {
		return null;
	}

	return (
		<>
			<hr/>

			<h5 className="card-title">{ title }</h5>
			<div className="btn-group-vertical d-block">
				{ Object.keys(games).map(documentId => (
					<Link className="btn btn-primary" to={ `/game/${documentId}` } key={ documentId }>{ documentId }</Link>
				)) }
			</div>
		</>
	);
}

export default DashbaordGamesList;
