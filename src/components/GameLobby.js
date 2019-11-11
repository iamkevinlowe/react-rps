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
import {
	getLocalUser,
	getUser
} from '../services/user';
import { areArraysSame } from '../services/utils';

function GameLobby() {
	const { gameId } = useParams();
	const { id: userId } = getLocalUser();
	const gameDocument = getGameDocument(gameId);

	const [
		players,
		setPlayers
	] = useState([]);

	const [
		redirectTo,
		setRedirectTo
	] = useState(null);

	useEffect(() => gameDocument.collection('players')
		.onSnapshot(snapshot => {
			const promises = snapshot.docs.map(document => {
				const {userId, weapon} = document.data();
				return getUser(userId)
					.then(user => {
						user.userId = userId;
						user.weapon = weapon;
						return user;
					});
			});

			Promise.all(promises)
				.then(gamePlayers => {
					if (!gamePlayers.find(({ userId: playerId }) => playerId === userId)) {
						if (gamePlayers.length >= 2) {
							setRedirectTo('/home');
						} else if (!userId) {
							setRedirectTo(`/home?redirectTo=${window.location.hash.slice(1)}`);
						} else {
							addPlayerToGame(gameDocument, userId);
						}
					}

					if (!areArraysSame(gamePlayers, players)) {
						setPlayers(gamePlayers);
					}
				});
			// eslint-disable-next-line
		}), []);

	if (redirectTo) {
		return <Redirect to={ redirectTo } />;
	}

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				<div className="card">
					<div className="card-header">{ gameId }</div>
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
