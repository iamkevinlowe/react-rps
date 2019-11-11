import db from './db';

/**
 * Gets the local user from the browser's local storage
 *
 * @returns {{}|{email: string, id: string, name: string}}
 */
export const getLocalUser = () => {
	let localUser = {};

	try {
		localUser = JSON.parse(localStorage.getItem('player')) || {};
	} catch (error) {
		console.log('Deleting corrupted player in local storage.');
		localStorage.removeItem('player');
	}

	return localUser;
};

/**
 * Sets the given user on the browser's local storage
 *
 * @param   {object}    user
 */
export const setLocalUser = user => localStorage.setItem('player', JSON.stringify(user));

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
			return userDocument.update({ name: user.name })
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
