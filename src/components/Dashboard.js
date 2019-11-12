import React, {
	useEffect,
	useState
} from 'react';
import { Redirect } from 'react-router-dom';
import DashboardGamesList from './DashboardGamesList';
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
	] = useState([]);

	const [
		gamesWaitingForOpponentMove,
		setGamesWaitingForOpponentMove
	] = useState([]);

	const [
		gamesWaitingForYourMove,
		setGamesWaitingForYourMove
	] = useState([]);

	const [
		stats,
		setStats
	] = useState({ wins: 0, ties: 0, losses: 0 });

	useEffect(() => {
		if (!userId) {
			return;
		}

		getGamesForUser(userId).then(handleGameUpdates);
		// eslint-disable-next-line
	}, [userId]);

	const handleGameUpdates = snapshots => {
		const newGamesWaitingForOpponent = [...gamesWaitingForOpponent];
		const newGamesWaitingForOpponentMove = [...gamesWaitingForOpponentMove];
		const newGamesWaitingForYourMove = [...gamesWaitingForYourMove];
		const newStats = Object.assign({}, stats);

		snapshots.forEach(snapshot => {
			const {
				name,
				ties = 0,
				userIds = [],
				weapons = []
			} = snapshot.data();

			if (userIds.length < 2) {
				newGamesWaitingForOpponent.push(name);
			} else {
				const index = newGamesWaitingForOpponent.indexOf(name);
				if (index >= 0) {
					newGamesWaitingForOpponent.splice(index, 1);
				}

				const winner = getWinner(weapons);

				if (
					winner.userId === null
					&& winner.tie === false
				) {
					const { weapon } = weapons.find(item => item.userId === userId) || {};
					weapon
						? newGamesWaitingForOpponentMove.push(name)
						: newGamesWaitingForYourMove.push(name);
				} else {
					const opponentIndex = newGamesWaitingForOpponentMove.indexOf(name);
					const yourIndex = newGamesWaitingForYourMove.indexOf(name);
					if (opponentIndex >= 0) {
						newGamesWaitingForOpponentMove.splice(opponentIndex, 1);
					} else if (yourIndex >= 0) {
						newGamesWaitingForYourMove.splice(yourIndex, 1);
					}

					if (winner.userId === userId) {
						newStats.wins++;
					} else if (!winner.tie && winner.userId !== null) {
						newStats.losses++;
					}
				}

				newStats.ties = ties;
			}
		});

		setGamesWaitingForOpponent(newGamesWaitingForOpponent);
		setGamesWaitingForOpponentMove(newGamesWaitingForOpponentMove);
		setGamesWaitingForYourMove(newGamesWaitingForYourMove);
		setStats(newStats);
	};

	if (!userId) {
		return <Redirect to="/home?redirectTo=/dashboard" />;
	}

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

						<DashboardGamesList title="Waiting for an opponent..." games={ gamesWaitingForOpponent } />
						<DashboardGamesList title="Waiting for opponent's move..." games={ gamesWaitingForOpponentMove } />
						<DashboardGamesList title="Waiting for your move..." games={ gamesWaitingForYourMove } />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
