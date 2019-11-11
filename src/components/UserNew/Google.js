import React from 'react';
import { signInGoogle } from '../../services/user';

function Google() {
	const onClickGoogleHandler = e => {
		signInGoogle();
	};

	return (
		<>
			<hr/>

			<button className="btn btn-outline-secondary btn-block" onClick={ onClickGoogleHandler }>
				<span className="float-left"><i className="fab fa-google"></i></span>
				Sign in with Google
			</button>
		</>
	);
}

export default Google;
