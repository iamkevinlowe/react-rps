import React from 'react';
import EmailPassword from './EmailPassword';
import Google from './Google';

function UserNew() {
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
