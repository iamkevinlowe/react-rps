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

export const setLocalUser = user => localStorage.setItem('player', JSON.stringify(user));

export const addUser = async user => db.collection('users')
	.add(user)
	.then(document => {
		user.id = document.id;
		return user;
	});

export const getUser = async userId => db.collection('users')
	.doc(userId)
	.get()
	.then(snapshot => snapshot.data());
