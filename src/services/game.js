import * as firebase from 'firebase/app';
import db from './db';

export const getGameDocument = gameId => {
	return db.collection('games')
		.doc(gameId);
};

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

export const getWeaponForPlayer = async (gameDocument, userId) => {
	return gameDocument.get()
		.then(snapshot => snapshot.data()[userId].weapon);
};

export const getPlayers = async gameDocument => {
	return gameDocument.get()
		.then(snapshot => {
			const userIds = Object.keys(snapshot.data());

			return db.collection('users')
				.where(firebase.firestore.FieldPath.documentId(), 'in', userIds)
				.get()
				.then(snapshot => snapshot.docs.map((document, index) => {
					const user = document.data();
					user.id = userIds[index];
					return user;
				}));
		});
};

export const getWinner = gameData => {
	const players = Object.keys(gameData);

	if (players.length < 2 || players.some(player => gameData[player].weapon === null)) {
		return null;
	}

	const [aWeapon, bWeapon] = players.map(player => ({
		userId: player,
		weapon: gameData[player].weapon
	}));

	if (
		(aWeapon.weapon === 'Rock' && bWeapon.weapon === 'Scissors')
		|| (aWeapon.weapon === 'Paper' && bWeapon.weapon === 'Rock')
		|| (aWeapon.weapon === 'Scissors' && bWeapon.weapon === 'Paper')
	) {
		return aWeapon;
	} else if (aWeapon.weapon === bWeapon.weapon) {
		return 0; // Maybe not the best representation of a tie
	} else {
		return bWeapon;
	}
};

export const deleteWeapons = gameDocument => {
	gameDocument.get()
		.then(snapshot => {
			Object.keys(snapshot.data()).forEach(userId => {
				addPlayerToGame(gameDocument, userId);
			});
		});
};
