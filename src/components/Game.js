import React, {
	useEffect,
	useState
} from 'react';
import { Link } from 'react-router-dom';
import {
	addWeaponToGame,
	deleteWeapons,
	getWeaponForPlayer,
	getWinner
} from '../services/game';
import { getUser } from '../services/user';
import { areObjectsSame } from '../services/utils';

function Game({ gameDocument, players, userId }) {
	const [
		weapon,
		setWeapon
	] = useState(null);

	const [
		winner,
		setWinner
	] = useState(null);

	useEffect(() => {
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

	const getPlayerNamesCopy = () => players.map(player => player.name).join(' vs. ');

	const getOpponentName = () => players.find(player => player.userId !== winner.userId).name;

	const getWeaponIcon = weapon => {
		let className = '';

		switch (weapon) {
			case 'Rock':
				className = 'fas fa-hand-rock';
				break;
			case 'Paper':
				className = 'fas fa-hand-paper';
				break;
			case 'Scissors':
				className = 'fas fa-hand-scissors';
				break;
			default:
				return null;
		}

		return <i className={ className }></i>;
	};

	const onClickWeaponHandler = e => {
		const weapon = e.currentTarget.dataset.name;

		addWeaponToGame(gameDocument, userId, weapon)
			.then(() => setWeapon(weapon));
	};

	if (winner !== null) {
		if (winner.tie) {
			setTimeout(() => {
				deleteWeapons(gameDocument);
				setWeapon(null);
				setWinner(null);
			}, 3000);

			return (
				<>
					<h5 className="card-title">{ getPlayerNamesCopy() }</h5>
					<p className="card-text">It was a tie! Both selected <span className="text-primary">{ getWeaponIcon(winner.weapon) }</span>. Starting a new match...</p>
				</>
			);
		}

		return (
			<>
				<h5 className="card-title">
					{ winner.userId === userId
						? [
							`Congrats, you beat ${getOpponentName()} with `,
							<span className="text-primary" key={ weapon }>{ getWeaponIcon(weapon) }</span>,
							'!'
						]
						: [
							`Sorry, ${winner.name} won with `,
							<span className="text-primary" key={ weapon }>{ getWeaponIcon(winner.weapon) }</span>,
							'.'
						] }
				</h5>
				<Link to="/" className="btn btn-primary btn-block">Play again?</Link>
			</>
		);
	}

	return (
		<>
			<h5 className="card-title">{ getPlayerNamesCopy() }</h5>
			{ weapon
				? <p className="card-text">
					You chose <span className="text-primary">{ getWeaponIcon(weapon) }</span>!
					<br/>
					Waiting for your opponent...
				</p>
				: <>
					<p className="card-text">Choose your weapon!</p>
					<div className="btn-group d-flex">
						{ ['Rock', 'Paper', 'Scissors'].map(weapon => (
							<button type="button" className="btn btn-outline-primary" style={{ flexGrow: 1 }} data-name={ weapon } onClick={ onClickWeaponHandler } key={ weapon }>
								{ getWeaponIcon(weapon) }
							</button>
						)) }
					</div>
				</> }
		</>
	);
}

export default Game;
