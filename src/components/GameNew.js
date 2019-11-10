import React, {
	useState
} from 'react';
import { Redirect } from 'react-router-dom';

function GameNew({ userId }) {
	const [
		gameId,
		setGameId
	] = useState(null);

	const onClickHostHandler = () => {
		const gameId = `Game_${Math.round(Math.random() * 1000)}`;
		setGameId(gameId);
	};

	const onSubmitJoinHandler = e => {
		e.preventDefault();

		const gameId = e.target.elements.name.value.trim();
		setGameId(gameId);
	};

	if (gameId) {
		return <Redirect to={`/game/${gameId}`} />;
	}

	return (
		<div className="card">
			<div className="card-body">
				<p className="card-text">Decide if you want to start a new game, or join an existing one</p>
				<button className="btn btn-primary btn-block mb-3" onClick={ onClickHostHandler }>Start a new game</button>

				<hr/>

				<form onSubmit={ onSubmitJoinHandler }>
					<div className="form-group">
						<input type="text" className="form-control" name="name" placeholder="Game Name"/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">Join a game</button>
				</form>
			</div>
		</div>
	);
}

export default GameNew;
