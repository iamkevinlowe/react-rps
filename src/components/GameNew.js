import React, {
	useState
} from 'react';
import { Redirect } from 'react-router-dom';
import { createGame } from '../services/game';

function GameNew({ userId }) {
	const [
		gameName,
		setGameName
	] = useState(null);

	const onClickHostHandler = () => createGame(null, userId).then(setGameName);

	const onSubmitJoinHandler = e => {
		e.preventDefault();

		const gameName = e.target.elements.name.value.trim();
		setGameName(gameName);
	};

	if (gameName) {
		return <Redirect to={`/game/${gameName}`} />;
	}

	return (
		<div className="card">
			<div className="card-body">
				<p className="card-text">Decide if you want to start a new game, or join an existing one</p>
				<button className="btn btn-primary btn-block mb-3" onClick={ onClickHostHandler }>Start a new game</button>

				<hr/>

				<form className="form-inline" onSubmit={ onSubmitJoinHandler }>
					<div className="input-group w-100">
						<input type="text" className="form-control" name="name" placeholder="Game Name"/>
						<div className="input-group-append">
							<button type="submit" className="btn btn-primary">Join a game</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default GameNew;
