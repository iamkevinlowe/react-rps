import React from 'react';
import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import GameLobby from './GameLobby';
import Home from './Home';
import Navbar from './Navbar';

function App() {
	return (
		<Router>
			<Navbar/>

			<Switch>
				<Redirect exact from="/" to="/home" />

				<Route path="/game/:gameId">
					<GameLobby />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
