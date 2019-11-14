import React, {
	useEffect,
	useState,
} from 'react';
import {
	Redirect,
	useParams
} from 'react-router-dom';
import Game from './Game';
import {
	addPlayerToGame,
	getGameDocument
} from '../services/game';
import { getUser } from '../services/user';
import { areArraysSame } from '../services/utils';

function GameLobby({ userId }) {
	const { gameName } = useParams();

	const [
		gameDocument,
		setGameDocument
	] = useState(null);

	const [
		players,
		setPlayers
	] = useState([]);

	const [
		redirectTo,
		setRedirectTo
	] = useState(null);

	useEffect(() => {
		let cleanup = null;

		getGameDocument(gameName).then(gameDocument => {
			setGameDocument(gameDocument);

			cleanup = gameDocument.onSnapshot(snapshot => {
				const { name, userIds = [], weapons = [] } = snapshot.data();
				if (name !== gameName) {
					setRedirectTo(`/game/${name}`);
					return;
				}

				if (!userIds.includes(userId)) {
					if (userIds.length >= 2) {
						setRedirectTo('/home');
					} else {
						addPlayerToGame(gameDocument, userId);
					}
					return;
				}

				const playersPromises = userIds.map(userId => getUser(userId)
					.then(user => {
						const { weapon = null } = weapons.find(item => item.userId === userId) || {};
						user.userId = userId;
						user.weapon = weapon;
						return user;
					}));

				Promise.all(playersPromises)
					.then(gamePlayers => {
						if (!areArraysSame(gamePlayers, players)) {
							setPlayers(gamePlayers);
						}
					});
			});
		});

		return () => cleanup && cleanup();
		// eslint-disable-next-line
	}, [gameName, userId]);

	if (redirectTo) {
		return <Redirect to={ redirectTo } />;
	}

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				<div className="card">
					<div className="card-header">{ gameName }</div>
					<div className="card-body">
						{ players.length < 2
							? <h5 className="card-title">Waiting for player...</h5>
							: <Game gameDocument={ gameDocument } players={ players } userId={ userId } /> }
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameLobby;
