import React from 'react';
import { signInGoogle } from '../../services/user';

function Google() {
	const onClickGoogleHandler = e => {
		signInGoogle();
	};

	return (
		<>
			<hr/>

			<button className="btn btn-block btn-outline-secondary" onClick={ onClickGoogleHandler }>
				<span className="badge badge-light mr-2">
					<i className="fa fa-google"></i>
				</span>
				Sign in with Google
			</button>
		</>
	);
}

export default Google;
