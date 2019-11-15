import * as firebase from 'firebase/app';
import db from './db';

/**
 * Gets a random game name
 *
 * @returns {string}
 */
const getRandomGameName = () => {
	return `Game_${Math.round(Math.random() * 1000)}`;
};

/**
 * Gets a document reference
 *
 * @param   {string}                                gameName
 * @returns {firebase.firestore.DocumentReference}
 */
export const getGameDocument = gameName => db.collection('games')
	.where('name', '==', gameName)
	.get()
	.then(snapshot => {
		if (snapshot.empty) {
			return createGame(gameName).then(getGameDocument);
		}

		return snapshot.docs[0].ref;
	});

/**
 * Inserts a game to the games collection
 *
 * @param   {string|null}                               name
 * @param   {string|null}                               userId
 * @returns {Promise<firebase.firestore.QuerySnapshot>}
 */
export const createGame = async (name = null, userId = null) => {
	name = name || getRandomGameName();
	const gamesCollection = db.collection('games');

	return gamesCollection.where('name', '==', name)
		.get()
		.then(snapshot => {
			if (!snapshot.empty) {
				return createGame(null, userId);
			}

			const values = { name };
			if (userId) {
				values.userIds = firebase.firestore.FieldValue.arrayUnion(userId);
			}

			return gamesCollection.add(values)
				.then(() => name);
		});
};

/**
 * Inserts a player with no weapon to the given game
 *
 * @param   {firebase.firestore.DocumentReference}  gameDocument
 * @param   {string}                                userId
 */
export const addPlayerToGame = (gameDocument, userId) => {
	gameDocument.get()
		.then(snapshot => {
			const { userIds = [] } = snapshot.data();
			if (userIds.length === 2) {
				throw new Error('Cannot add user to game');
			}

			const values = { userIds: firebase.firestore.FieldValue.arrayUnion(userId) };
			gameDocument.update(values)
				.catch(err => console.log(`Error encountered: ${err}`));
		});
};

/**
 * Updates a player's weapon
 *
 * @param   {firebase.firestore.DocumentReference}      gameDocument
 * @param   {string}                                    userId
 * @param   {string}                                    weapon
 * @returns {Promise<firebase.firestore.QuerySnapshot>}
 */
export const addWeaponToGame = async (gameDocument, userId, weapon) => gameDocument.get()
	.then(snapshot => {
		const { weapons = [] } = snapshot.data();
		if (weapons.length === 2) {
			throw new Error('Cannot add weapon to game');
		}

		const values = firebase.firestore.FieldValue.arrayUnion({ userId, weapon });
		return gameDocument.update('weapons', values);
	});

/**
 * Gets the weapon for the given player
 *
 * @param   {firebase.firestore.DocumentReference}      gameDocument
 * @param   {string}                                    userId
 * @returns {Promise<firebase.firestore.QuerySnapshot>}
 */
export const getWeaponForPlayer = async (gameDocument, userId) => gameDocument.get()
	.then(snapshot => {
		const {
			weapons = [],
			userIds = []
		} = snapshot.data();

		if (!userIds.includes(userId)) {
			addPlayerToGame(gameDocument, userId);
			return null
		} else {
			const { weapon = null } = weapons.find(item => item.userId === userId) || {};
			return weapon;
		}
	});

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
export const deleteWeapons = gameDocument => gameDocument.update({ weapons: firebase.firestore.FieldValue.delete() })
	.catch(err => console.log(`Error encountered: ${err}`));

/**
 * Gets all the games where the given user is a player of
 *
 * @param   {string}                                            userId
 * @returns {Promise<firebase.firestore.DocumentReference[]>}
 */
export const getGamesForUser = userId => db.collection('games')
	.where('userIds', 'array-contains', userId)
	.get()
	.then(snapshot => snapshot.docs);
