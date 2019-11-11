import React, {
	useEffect,
	useState
} from 'react';
import { signInEmail } from '../../services/user';

function EmailPassword() {
	const [
		isPendingEmailLinkSent,
		setIsPendingEmailLinkSent
	] = useState(false);

	const [
		showEmailSentCopy,
		setShowEmailSentCopy
	] = useState(false);

	useEffect(() => {
		if (window.localStorage.hasOwnProperty('userForSignInEmail')) {
			setIsPendingEmailLinkSent(true);
		}
	}, []);

	const onClickResendHandler = e => {
		let user = null;
		try {
			user = JSON.parse(window.localStorage.getItem('userForSignInEmail'));
		} catch (error) {
			console.log('User corrupted in local storage');
			window.localStorage.removeItem('userForSignInEmail');
		}

		if (user) {
			signInEmail(user);
			setShowEmailSentCopy(true);
			setTimeout(() => {
				setShowEmailSentCopy(false);
			}, 3000);
		} else {
			setIsPendingEmailLinkSent(false);
		}
	};

	const onSubmitFormHandler = e => {
		e.preventDefault();

		const name = e.target.elements.name.value.trim();
		const email = e.target.elements.email.value.trim().toLowerCase();

		if (!name || !email) {
			return;
		}

		signInEmail({ name, email });
		setIsPendingEmailLinkSent(true);
	};

	return (
		<>
			<hr/>

			{ isPendingEmailLinkSent
				? <>
					<p className="card-text">{ showEmailSentCopy ? 'Verification email sent...' : 'Waiting for email verification...' }</p>
					<button className="btn btn-link" onClick={ onClickResendHandler }>Click here to resend verification email</button>
				</>
				: <form onSubmit={ onSubmitFormHandler }>
					<div className="form-row form-group">
						<div className="col">
							<input type="text" className="form-control" name="name" placeholder="Your Name"/>
						</div>
						<div className="col">
							<input type="email" className="form-control" name="email" placeholder="Your Email"/>
						</div>
					</div>

					<button type="submit" className="btn btn-outline-primary btn-block">
						<span className="float-left"><i className="far fa-envelope"></i></span>
						Sign in with Email
					</button>
				</form> }
		</>
	);
}

export default EmailPassword;
