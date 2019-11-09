import db from './db';

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

export const setLocalUser = user => {
	localStorage.setItem('player', JSON.stringify(user));
};

export const addUser = async user => {
	return db.collection('users')
		.add(user)
		.then(document => document.id);
};

export const getUser = async userId => {
	return db.collection('users')
		.doc(userId)
		.get()
		.then(snapshot => snapshot.data());
};
