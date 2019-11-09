import React, {
	useEffect,
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

	useEffect(() => {
		getPlayers(gameDocument)
			.then(gamePlayers => {
				if (!areArraysSame(gamePlayers, players)) {
					setPlayers(gamePlayers);
				}
			});

		getWeaponForPlayer(gameDocument, userId)
			.then(weapon => setWeapon(weapon));

		return gameDocument.onSnapshot(snapshot => {
			const gameWinner = getWinner(snapshot);

			if (gameWinner.tie) {
				setWinner(gameWinner);
			} else if (gameWinner.userId) {
				getUser(gameWinner.userId)
					.then(user => {
						Object.assign(user, gameWinner);

						if (!areObjectsSame(user, winner)) {
							setWinner(user);
						}
					});
			}
		});
	}, [gameDocument, userId]);

	const getPlayerNamesCopy = () => players.map(player => player.name).join(' vs ');

	const getWinnerCopy = () => {
		if (winner) {
			if (winner.tie) {
				setTimeout(() => {
					deleteWeapons(gameDocument);
					setWeapon(null);
					setWinner(null);
				}, 3000);

				return `It was a tie! Both selected ${winner.weapon}. Starting a new match...`;
			} else if (winner.userId === userId) {
				const opponent = players.find(player => player.userId !== winner.userId);
				return `Congrats, you beat ${opponent.name} with ${weapon}!`;
			} else {
				return `Sorry, ${winner.name} won with ${winner.weapon}.`;
			}
		}

		return '';
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
				{ winner.tie === false
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
