import React from 'react';
import {
	Redirect,
	useLocation,
} from 'react-router-dom';
import GameNew from './GameNew';
import UserNew from './UserNew/UserNew';

function Home({ userId }) {
	const searchParams = new URLSearchParams(useLocation().search);
	const redirectTo = searchParams.get('redirectTo');

	if (userId && redirectTo) {
		return <Redirect to={ redirectTo }/>;
	}

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				{ userId
					? <GameNew userId={ userId } />
					: <UserNew/> }
			</div>
		</div>
	);
}

export default Home;
