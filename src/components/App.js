import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home';
import GameLobby from './GameLobby';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/react-rps/game/:gameId">
					<GameLobby />
				</Route>
				<Route path="/react-rps">
					<Home />
				</Route>
				<Route path="/">
					<Redirect to="/react-rps"/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
