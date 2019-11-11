import React, {
	useState
} from 'react';
import {
	Redirect,
	useLocation,
} from 'react-router-dom';
import GameNew from './GameNew';
import UserNew from './UserNew/UserNew';
import {
	getLocalUser,
	setLocalUser
} from '../services/user';

function Home() {
	const [
		user,
		setUser
	] = useState(getLocalUser());

	const redirectTo = new URLSearchParams(useLocation().search).get('redirectTo');

	const setLocalAndStateUser = user => {
		setLocalUser(user);
		setUser(user);
	};

	if (user.id && redirectTo) {
		return <Redirect to={ redirectTo }/>;
	}

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				{ user.id
					? <GameNew userId={ user.id }/>
					: <UserNew setUser={ setLocalAndStateUser } /> }
			</div>
		</div>
	);
}

export default Home;
