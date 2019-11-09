import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import Home from './Home';
import GameLobby from './GameLobby';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/game/:gameId">
					<GameLobby />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
