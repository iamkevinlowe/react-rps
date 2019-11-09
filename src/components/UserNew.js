import React from 'react';
import { addUser } from '../services/user';
import './UserNew.css';

function UserNew({ user, setUser }) {
	const onSubmitHandler = e => {
		e.preventDefault();

		const name = e.target.elements.name.value.trim();
		const email = e.target.elements.email.value.trim().toLowerCase();

		if (!name || !email) {
			return;
		}

		const user = { name, email };

		addUser(user)
			.then(id => {
				user.id = id;
				setUser(user);
			});
	};

	if (typeof user.name !== 'undefined' && typeof user.email !== 'undefined') {
		return null;
	}

	return (
		<div className="row">
			<div className="col-sm-4 offset-md-4">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">New phone, who dis?</h5>
						<p className="card-text">Before we begin, I need to know who you are</p>
						<form onSubmit={ onSubmitHandler }>
							<div className="form-group">
								<input type="text" className="form-control" name="name" placeholder="Your Name"/>
							</div>
							<div className="form-group">
								<input type="email" className="form-control" name="email" placeholder="Your Email"/>
							</div>
							<button type="submit" className="btn btn-primary btn-block">Let's RPS!</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserNew;
