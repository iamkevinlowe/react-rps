import React, {
	useState
} from 'react';
import UserNew from './UserNew';
import GameNew from './GameNew';
import {
	getLocalUser,
	setLocalUser
} from '../services/user';

function Home() {
	const [
		user,
		setUser
	] = useState(getLocalUser());

	const setLocalAndStateUser = user => {
		setLocalUser(user);
		setUser(user);
	};

	return (
		<div className="Home">
			<UserNew user={ user } setUser={ setLocalAndStateUser } />
			{ user.id
				? <GameNew userId={ user.id }/>
				: null }
		</div>
	);
}

export default Home;
