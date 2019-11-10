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
	getGameDocument,
	getPlayers
} from '../services/game';
import { getLocalUser } from '../services/user';
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

	useEffect(() => gameDocument.onSnapshot(snapshot => {
		getPlayers(snapshot.ref)
			.then(gamePlayers => {
				if (!gamePlayers.find(({ userId: playerId }) => playerId === userId)) {
					return gamePlayers.length < 2 && userId
						? addPlayerToGame(snapshot.ref, userId)
						: setRedirectTo('/');
				}

				if (!areArraysSame(gamePlayers, players)) {
					setPlayers(gamePlayers);
				}
			});
	}), []);

	if (redirectTo) {
		return <Redirect to={ redirectTo } />;
	}

	return (
		<div className="row">
			<div className="col-sm-4 offset-sm-4">
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
