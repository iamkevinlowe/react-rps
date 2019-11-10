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

	const values = {
		userId,
		weapon: null
	};

	gameDocument.collection('players').add(values)
		.catch(err => console.log(`Error encountered: ${err}`));
};

/**
 * Updates a player's weapon
 *
 * @param   {firebase.firestore.DocumentReference}  gameDocument
 * @param   {string}                                userId
 * @param   {string}                                weapon
 * @returns {Promise<firebase.firestore.QuerySnapshot>}
 */
export const addWeaponToGame = async (gameDocument, userId, weapon) => {
	const values = { weapon };

	return gameDocument.collection('players')
		.where('userId', '==', userId)
		.get()
		.then(snapshot => snapshot.docs[0].ref.update(values));
};

/**
 * Gets the weapon for the given player
 *
 * @param   {firebase.firestore.DocumentReference}  gameDocument
 * @param   {string}                                userId
 * @returns {Promise<firebase.firestore.QuerySnapshot>}
 */
export const getWeaponForPlayer = async (gameDocument, userId) => gameDocument.collection('players')
	.where('userId', '==', userId)
	.get()
	.then(snapshot => snapshot.empty
		? addPlayerToGame(gameDocument, userId).then(() => null)
		: snapshot.docs[0].data().weapon);

/**
 * Determines the winner from the document snapshot data
 *
 * @param   {{userId: string, weapon: *}[]}   players
 * @returns {{tie: boolean, userId: *, weapon: *}}
 */
export const getWinner = players => {
	const winner = {
		tie: false,
		userId: null,
		weapon: null
	};

	if (
		players.length < 2
		|| players.some(({ weapon }) => weapon === null)
	) {
		return winner;
	}

	const [aPlayer, bPlayer] = players;

	if (
		(aPlayer.weapon === 'Rock' && bPlayer.weapon === 'Scissors')
		|| (aPlayer.weapon === 'Paper' && bPlayer.weapon === 'Rock')
		|| (aPlayer.weapon === 'Scissors' && bPlayer.weapon === 'Paper')
	) {
		Object.assign(winner, aPlayer);
	} else if (aPlayer.weapon === bPlayer.weapon) {
		winner.tie = true;
		winner.weapon = aPlayer.weapon;
	} else {
		Object.assign(winner, bPlayer);
	}

	return winner;
};

/**
 * Resets the player's weapons for the given game
 *
 * @param {firebase.firestore.DocumentReference}    gameDocument
 */
export const deleteWeapons = gameDocument => gameDocument.collection('players')
	.get()
	.then(snapshot => {
		snapshot.docs.forEach(document => document.ref.update({ weapon: null }));
	});

/**
 * Gets all the games where the given user is a player of
 *
 * @param userId
 * @returns {Promise<firebase.firestore.DocumentReference[]>}
 */
export const getGamesForUser = userId => db.collectionGroup('players')
	.where('userId', '==', userId)
	.get()
	.then(snapshot => snapshot.docs.map(document => document.ref.parent.parent));
