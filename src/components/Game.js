import React, {
	useState
} from 'react';
import { Link } from 'react-router-dom';
import {
	addWeaponToGame,
	deleteWeapons,
	getPlayers,
	getWeaponForPlayer,
	getWinner
} from '../services/game';
import { getUser } from '../services/user';
import {
	areArraysSame,
	areObjectsSame
} from '../services/utils';

function Game({ gameDocument, userId }) {
	const [
		players,
		setPlayers
	] = useState([]);

	const [
		weapon,
		setWeapon
	] = useState(null);

	const [
		winner,
		setWinner
	] = useState(null);

	getPlayers(gameDocument)
		.then(gamePlayers => {
			if (!areArraysSame(gamePlayers, players)) {
				setPlayers(gamePlayers);
			}
		});

	getWeaponForPlayer(gameDocument, userId)
		.then(weapon => setWeapon(weapon));

	gameDocument.onSnapshot(snapshot => {
		const gameWinner = getWinner(snapshot.data());

		if (gameWinner === 0) {
			setWinner(gameWinner);
		} else if (gameWinner) {
			const { userId, weapon } = gameWinner;

			if (userId && weapon) {
				getUser(userId)
					.then(user => {
						user.id = userId;
						user.weapon = weapon;

						if (!areObjectsSame(user, winner)) {
							setWinner(user);
						}
					});
			}
		}
	});

	const getPlayerNamesCopy = () => {
		return players.map(player => player.name)
			.join(' vs ');
	};

	const getWinnerCopy = () => {
		if (winner === 0) {
			setTimeout(() => {
				deleteWeapons(gameDocument);
				setWinner(null);
			}, 3000);

			return `It was a tie! Both selected ${weapon}. Starting a new match...`;
		} else if (winner) {
			if (winner.id === userId) {
				const opponent = players.find(player => player.id !== winner.id);
				return `Congrats, you beat ${opponent.name} with ${weapon}!`;
			} else {
				return `Sorry, ${winner.name} won with ${winner.weapon}.`;
			}
		}
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		const weapon = e.target.elements.weapon.value;

		addWeaponToGame(gameDocument, userId, weapon)
			.then(() => setWeapon(weapon));
	};

	if (winner !== null) {
		return (
			<>
				<h5 className="card-title">{ getWinnerCopy() }</h5>
				{ winner
					? <Link to="/" className="btn btn-primary btn-block">Play again?</Link>
					: null }
			</>
		);
	}

	return (
		<>
			<h5 className="card-title">{ getPlayerNamesCopy() }</h5>
			{ weapon
				? <p className="card-text">You chose {weapon}! Waiting for your opponent...</p>
				: <>
					<p className="card-text">Choose your weapon!</p>
					<form onSubmit={ onSubmitHandler }>
						<div className="form-group">
							<div className="form-check">
								<input id="weapon_rock" className="form-check-input" type="radio" name="weapon" value="Rock"/>
								<label htmlFor="weapon_rock" className="form-check-label">Rock</label>
							</div>

							<div className="form-check">
								<input id="weapon_paper" className="form-check-input" type="radio" name="weapon" value="Paper"/>
								<label htmlFor="weapon_paper" className="form-check-label">Paper</label>
							</div>

							<div className="form-check">
								<input id="weapon_scissors" className="form-check-input" type="radio" name="weapon" value="Scissors"/>
								<label htmlFor="weapon_scissors" className="form-check-label">Scissors</label>
							</div>
						</div>

						<button type="submit" className="btn btn-primary btn-block">Shoot!</button>
					</form>
				</>
			}
		</>
	);
}

export default Game;
