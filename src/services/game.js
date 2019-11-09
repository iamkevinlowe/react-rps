import * as firebase from 'firebase/app';
import db from './db';

export const getGameDocument = gameId => db.collection('games').doc(gameId);

export const addPlayerToGame = async (gameId, userId) => {
	const gameDocument = gameId.constructor.name === 'DocumentReference'
		? gameId
		: getGameDocument(gameId);

	const values = {};
	values[userId] = { weapon: null };

	return gameDocument.set(values, { merge: true });
};

export const addWeaponToGame = async (gameDocument, userId, weapon) => {
	const values = {};
	values[userId] = { weapon };

	return gameDocument.update(values);
};

export const getWeaponForPlayer = async (gameDocument, userId) => gameDocument.get()
	.then(snapshot => snapshot.data()[userId].weapon);

export const getPlayers = async gameDocument => gameDocument.get()
	.then(snapshot => db.collection('users')
		.where(firebase.firestore.FieldPath.documentId(), 'in', Object.keys(snapshot.data()))
		.get()
		.then(snapshot => snapshot.docs.map(document => {
			const user = document.data();
			user.userId = document.id;
			return user;
		}))
	);

export const getWinner = gameData => {
	const players = Object.keys(gameData);

	if (
		players.length < 2
		|| players.some(player => gameData[player].weapon === null)
	) {
		return null;
	}

	const [aWeapon, bWeapon] = players.map(player => ({
		userId: player,
		weapon: gameData[player].weapon,
		tie: false
	}));

	if (
		(aWeapon.weapon === 'Rock' && bWeapon.weapon === 'Scissors')
		|| (aWeapon.weapon === 'Paper' && bWeapon.weapon === 'Rock')
		|| (aWeapon.weapon === 'Scissors' && bWeapon.weapon === 'Paper')
	) {
		return aWeapon;
	} else if (aWeapon.weapon === bWeapon.weapon) {
		return { tie: true, weapon: aWeapon.weapon };
	} else {
		return bWeapon;
	}
};

export const deleteWeapons = gameDocument => {
	gameDocument.get()
		.then(snapshot => {
			const values = Object.keys(snapshot.data())
				.reduce((memo, userId) => {
					memo[userId] = { weapon: null };
					return memo;
				}, {});

			gameDocument.set(values);
		})
		.catch(err => {
			console.log(`Error encountered: ${err}`);
		});
};
