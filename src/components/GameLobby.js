import React, {
	useEffect,
	useState,
} from 'react';
import {
	Redirect,
	useParams
} from 'react-router-dom';
import Game from './Game';
import { getLocalUser } from '../services/user';
import {
	addPlayerToGame,
	getGameDocument
} from '../services/game';

function GameLobby() {
	const { gameId } = useParams();
	const { id: userId } = getLocalUser();
	const gameDocument = getGameDocument(gameId);

	const [
		numPlayers,
		setNumPlayers
	] = useState(0);

	useEffect(() => gameDocument.onSnapshot(snapshot => {
		const snapshotPlayers = snapshot.exists
			? Object.keys(snapshot.data())
			: [];

		if (!snapshotPlayers.includes(userId)) {
			addPlayerToGame(snapshot.ref, userId);
			return;
		}

		setNumPlayers(snapshotPlayers.length);
	}), []);

	if (!gameId || !userId) {
		return <Redirect to="/" />;
	}

	return (
		<div className="row">
			<div className="col-sm-4 offset-sm-4">
				<div className="card">
					<div className="card-header">
						{ gameId }
					</div>
					<div className="card-body">
						{ numPlayers < 2
							? <h5 className="card-title">Waiting for player...</h5>
							: <Game gameDocument={ gameDocument } userId={ userId } /> }
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameLobby;
