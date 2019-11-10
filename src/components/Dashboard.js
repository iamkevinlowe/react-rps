import React, {
	useEffect,
	useState
} from 'react';
import { Link } from 'react-router-dom';
import {
	getGamesForUser,
	getWinner
} from '../services/game';
import { getLocalUser } from '../services/user';

function Dashboard() {
	const { id: userId } = getLocalUser();

	const [
		gamesWaitingForOpponent,
		setGamesWaitingForOpponent
	] = useState({});

	const [
		gamesWaitingForOpponentMove,
		setGamesWaitingForOpponentMove
	] = useState({});

	const [
		gamesWaitingForYourMove,
		setGamesWaitingForYourMove
	] = useState({});

	const [
		stats,
		setStats
	] = useState({ wins: 0, ties: 0, losses: 0 });

	useEffect(() => {
		getGamesForUser(userId)
			.then(documents => {
				const promises = documents.map(document => document.collection('players').get());

				Promise.all(promises)
					.then(handleGameUpdates);
			});
	}, [userId]);

	const handleGameUpdates = snapshots => {
		const newGamesWaitingForOpponent = Object.assign({}, gamesWaitingForOpponent);
		const newGamesWaitingForOpponentMove = Object.assign({}, gamesWaitingForOpponentMove);
		const newGamesWaitingForYourMove = Object.assign({}, gamesWaitingForYourMove);
		const newStats = Object.assign({}, stats);

		snapshots.forEach(snapshot => {
			const gameDocument = snapshot.docs[0].ref.parent.parent;

			if (snapshot.size < 2) {
				newGamesWaitingForOpponent[gameDocument.id] = gameDocument;
			} else {
				if (newGamesWaitingForOpponent.hasOwnProperty(gameDocument.id)) {
					delete newGamesWaitingForOpponent[gameDocument.id];
				}

				const players = snapshot.docs.map(document => document.data());
				const winner = getWinner(players);

				if (
					winner.userId === null
					&& winner.tie === false
				) {
					const { weapon } = players.find(player => player.userId === userId);
					weapon
						? newGamesWaitingForOpponentMove[gameDocument.id] = gameDocument
						: newGamesWaitingForYourMove[gameDocument.id] = gameDocument;
				} else {
					if (newGamesWaitingForOpponentMove.hasOwnProperty(gameDocument.id)) {
						delete newGamesWaitingForOpponentMove[gameDocument.id];
					} else if (newGamesWaitingForYourMove.hasOwnProperty(gameDocument.id)) {
						delete newGamesWaitingForYourMove[gameDocument.id];
					}

					if (winner.userId === userId) {
						newStats.wins++;
					} else if (winner.tie) {
						newStats.ties++;
					} else if (winner.userId !== null) {
						newStats.losses++;
					}
				}
			}
		});

		setGamesWaitingForOpponent(newGamesWaitingForOpponent);
		setGamesWaitingForOpponentMove(newGamesWaitingForOpponentMove);
		setGamesWaitingForYourMove(newGamesWaitingForYourMove);
		setStats(newStats);
	};

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				<div className="card">
					<div className="card-header">Dashboard</div>
					<div className="card-body">
						<h5 className="card-title">Your Stats</h5>
						<p className="card-text"><span className="strong">Wins:</span> {stats.wins}</p>
						<p className="card-text"><span className="strong">Ties:</span> {stats.ties}</p>
						<p className="card-text"><span className="strong">Losses:</span> {stats.losses}</p>

						<hr/>

						<h5 className="card-title">Waiting for an opponent...</h5>
						<div className="btn-group-vertical d-block">
							{ Object.keys(gamesWaitingForOpponent).map(documentId => (
								<Link className="btn btn-primary" to={ `/game/${documentId}` } key={ documentId }>{ documentId }</Link>
							)) }
						</div>

						<hr/>

						<h5 className="card-title">Waiting for opponent's move...</h5>
						<div className="btn-group-vertical d-block">
							{ Object.keys(gamesWaitingForOpponentMove).map(documentId => (
								<Link className="btn btn-primary" to={ `/game/${documentId}` } key={ documentId }>{ documentId }</Link>
							)) }
						</div>

						<hr/>

						<h5 className="card-title">Waiting for your move...</h5>
						<div className="btn-group-vertical d-block">
							{ Object.keys(gamesWaitingForYourMove).map(documentId => (
								<Link className="btn btn-primary" to={ `/game/${documentId}` } key={ documentId }>{ documentId }</Link>
							)) }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
