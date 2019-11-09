import * as firebase from 'firebase/app';
import db from './db';

/**
 * Gets a document reference
 *
 * @param   {string}                                gameId
 * @returns {firebase.firestore.DocumentReference}
 */
export const getGameDocument = gameId => db.collection('games').doc(gameId);

/**
 * Inserts a player with no weapon to the given game
 *
 * @param   {string|firebase.firestore.DocumentReference}   gameId
 * @param   {string}                                        userId
 */
export const addPlayerToGame = (gameId, userId) => {
	const gameDocument = gameId instanceof firebase.firestore.DocumentReference
		? gameId
		: getGameDocument(gameId);

	const values = {};
	values[userId] = { weapon: null };

	gameDocument.set(values, { merge: true })
		.catch(err => console.log(`Error encountered: ${err}`));
};

/**
 * Updates a player's weapon
 *
 * @param   {firebase.firestore.DocumentReference}  gameDocument
 * @param   {string}                                userId
 * @param   {string}                                weapon
 * @returns {Promise<void>}
 */
export const addWeaponToGame = async (gameDocument, userId, weapon) => {
	const values = {};
	values[userId] = { weapon };

	return gameDocument.update(values);
};

/**
 * Gets the weapon for the given player
 *
 * @param   {firebase.firestore.DocumentReference}  gameDocument
 * @param   {string}                                userId
 * @returns {Promise<string|void>}
 */
export const getWeaponForPlayer = async (gameDocument, userId) => gameDocument.get()
	.then(snapshot => snapshot.data()[userId].weapon);

/**
 * Gets the players for the given game
 *
 * @param   {firebase.firestore.DocumentReference}          gameDocument
 * @returns {Promise<firebase.firestore.DocumentData[]>}
 */
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

/**
 * Determines the winner from the document snapshot data
 *
 * @param   {firebase.firestore.DocumentSnapshot}   gameSnapshot
 * @returns {{tie: boolean, userId: *, weapon: *}}
 */
export const getWinner = gameSnapshot => {
	const gameData = gameSnapshot.data();
	const playerIds = Object.keys(gameData);

	if (
		playerIds.length < 2
		|| playerIds.some(playerId => gameData[playerId].weapon === null)
	) {
		return { tie: false, userId: null, weapon: null };
	}

	const [aWeapon, bWeapon] = playerIds.map(playerId => ({
		tie: false,
		userId: playerId,
		weapon: gameData[playerId].weapon
	}));

	if (
		(aWeapon.weapon === 'Rock' && bWeapon.weapon === 'Scissors')
		|| (aWeapon.weapon === 'Paper' && bWeapon.weapon === 'Rock')
		|| (aWeapon.weapon === 'Scissors' && bWeapon.weapon === 'Paper')
	) {
		return aWeapon;
	} else if (aWeapon.weapon === bWeapon.weapon) {
		return { tie: true, userId: null, weapon: aWeapon.weapon };
	} else {
		return bWeapon;
	}
};

/**
 * Resets the player's weapons for the given game
 *
 * @param {firebase.firestore.DocumentReference}    gameDocument
 */
export const deleteWeapons = gameDocument => gameDocument.get()
	.then(snapshot => {
		const values = Object.keys(snapshot.data())
			.reduce((memo, userId) => {
				memo[userId] = { weapon: null };
				return memo;
			}, {});

		snapshot.ref.update(values)
			.catch(err => console.log(`Error encountered: ${err}`));
	});
