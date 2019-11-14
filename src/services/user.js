import db from './db';
import * as firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Inserts a user to the users collection
 *
 * @param   {object}                                        user
 * @returns {Promise<firebase.firestore.DocumentReference>}
 */
export const addUser = async user => {
	const usersCollection = db.collection('users');

	return usersCollection.where('email', '==', user.email)
		.get()
		.then(snapshot => {
			if (snapshot.empty) {
				return usersCollection.add(user)
					.then(document => {
						user.id = document.id;
						return user;
					});
			}

			const userDocument = snapshot.docs[0].ref;
			return userDocument.update(user)
				.then(() => {
					user.id = userDocument.id;
					return user;
				});
		});
};

/**
 * Gets the data for the given user
 *
 * @param   {string}                                    userId
 * @returns {Promise<firebase.firestore.DocumentData>}
 */
export const getUser = async userId => db.collection('users')
	.doc(userId)
	.get()
	.then(snapshot => snapshot.data());

/**
 * Sign in user with Google
 */
export const signInGoogle = () => {
	firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(() => {
			const provider = new firebase.auth.GoogleAuthProvider();
			return firebase.auth().signInWithRedirect(provider);
		});
};

/**
 * Sign in user with Email.
 * This sends a verification email.
 *
 * @param {{ email: string, name: string }} user
 */
export const signInEmail = user => {
	firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(() => {
			const actionCodeSettings = {
				url: process.env.NODE_ENV === 'production'
					? 'https://iamkevinlowe.github.io/react-rps'
					: 'http://localhost:3000',
				handleCodeInApp: true
			};

			firebase.auth()
				.sendSignInLinkToEmail(user.email, actionCodeSettings)
				.then(() => window.localStorage.setItem('userForSignInEmail', JSON.stringify(user)));
		});
};

/**
 * Checks for an authorized user from an email link
 *
 * @returns {Promise<boolean>}
 */
export const checkUserFromEmailLink = () => {
	if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
		try {
			const { email, name } = JSON.parse(window.localStorage.getItem('userForSignInEmail'));
			if (!email || !name) {
				throw new Error('Email and Name not found in local storage');
			}

			firebase.auth()
				.signInWithEmailLink(email, window.location.href)
				.then(({ user }) => {
					window.localStorage.removeItem('userForSignInEmail');
					user && addUser({
						email: user.email || email,
						name: name || user.displayName,
						uid: user.uid
					});
				});
		} catch (error) {
			console.log(error);
			window.localStorage.removeItem('userForSignInEmail');
		}
		return Promise.resolve(true);
	}

	return Promise.resolve(false);
};

/**
 * Sets a listener for the auth state and executes the success handler
 *
 * @param   {function}              successHandler
 * @returns {firebase.Unsubscribe}
 */
export const setAuthListener = successHandler => firebase.auth()
	.onAuthStateChanged(user => {
		if (user) {
			db.collection('users')
				.where('uid', '==', user.uid)
				.get()
				.then(snapshot => {
					const authUser = {
						email: user.email,
						name: user.displayName,
						uid: user.uid
					};

					if (snapshot.empty) {
						return addUser(authUser);
					}

					authUser.id = snapshot.docs[0].ref.id;
					return authUser;
				}).then(successHandler);
		} else {
			successHandler();
		}
	});

/**
 * Logs the current user out
 */
export const logout = () => firebase.auth().signOut();
