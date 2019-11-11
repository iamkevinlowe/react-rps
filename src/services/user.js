import db from './db';
import * as firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Gets the local user from the browser's local storage
 *
 * @returns {{}|{email: string, id: string, name: string}}
 */
export const getLocalUser = () => {
	let localUser = {};

	try {
		localUser = JSON.parse(window.localStorage.getItem('player')) || {};
	} catch (error) {
		console.log('Deleting corrupted player in local storage.');
		window.localStorage.removeItem('player');
	}

	return localUser;
};

/**
 * Sets the given user on the browser's local storage
 *
 * @param   {object}    user
 */
export const setLocalUser = user => window.localStorage.setItem('player', JSON.stringify(user));

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
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
};

/**
 * Sign in user with Email.
 * This sends a verification email.
 *
 * @param {{ email: string, name: string }} user
 */
export const signInEmail = user => {
	const actionCodeSettings = {
		url: process.env.ENVIRONMENT === 'production'
			? 'https://iamkevinlowe.github.io/react-rps'
			: 'http://localhost:3000',
		handleCodeInApp: true
	};

	firebase.auth().sendSignInLinkToEmail(user.email, actionCodeSettings)
		.then(() => window.localStorage.setItem('userForSignInEmail', JSON.stringify(user)));
};

/**
 * Checks for an authorized user
 *
 * @returns {Promise<firebase.auth.UserCredential>}
 */
export const getAuthorizedUser = () => {
	if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
		let cachedUser = null;

		try {
			cachedUser = JSON.parse(window.localStorage.getItem('userForSignInEmail'));
		} catch (error) {
			console.log('User corrupted in local storage');
			window.localStorage.removeItem('userForSignInEmail');
		}

		if (!cachedUser) {
			throw new Error('No cached user');
		}

		return firebase.auth()
			.signInWithEmailLink(cachedUser.email, window.location.href)
			.then(({ user }) => {
				window.localStorage.removeItem('userForSignInEmail');
				return user
					? addUser({
						email: user.email || cachedUser.email,
						uid: user.uid,
						name: cachedUser.name || user.displayName
					})
					: null;
			});
	} else {
		return firebase.auth()
			.getRedirectResult()
			.then(({ user }) => user
				? addUser({
					email: user.email,
					uid: user.uid,
					name: user.displayName
				})
				: null
			);
	}
};
