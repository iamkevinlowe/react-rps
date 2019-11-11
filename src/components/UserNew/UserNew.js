import React, {
	useEffect
} from 'react';
import EmailPassword from './EmailPassword';
import Google from './Google';
import { getAuthorizedUser } from '../../services/user';

function UserNew({ setUser }) {
	useEffect(() => {
		getAuthorizedUser().then(user => user && setUser(user));
	}, [setUser]);

	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">New phone, who dis?</h5>
				<p className="card-text">Before we begin, I need to know who you are</p>

				<EmailPassword/>
				<Google/>
			</div>
		</div>
	);
}

export default UserNew;
