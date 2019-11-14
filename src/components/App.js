import React, {
	useEffect,
	useState
} from 'react';
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
import PrivateRoute from './PrivateRoute';
import { checkUserFromEmailLink, setAuthListener } from '../services/user';
import 'bootstrap/scss/bootstrap.scss';
import '@fortawesome/fontawesome-pro/css/all.css';

function App() {
	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const [
		user,
		setUser
	] = useState({});

	useEffect(() => setAuthListener((user = {}) => {
		isLoading && setIsLoading(false);
		setUser(user);
		if (!user.id) {
			checkUserFromEmailLink().then(result => {
				if (result) {
					const continueUrl = new URLSearchParams(window.location.search).get('continueUrl');
					window.history.replaceState({}, document.title, continueUrl);
				}
			});
		}
		// eslint-disable-next-line
	}), []);

	return (
		isLoading
			? <div className="vh-100 d-flex justify-content-center align-items-center">
				<h5 className="align-self-center">Loading...</h5>
			</div>
			: <Router>
				<Navbar userId={ user.id } />

				<Switch>
					<Redirect exact from="/" to="/home" />

					<PrivateRoute path="/game/:gameName" userId={ user.id }>
						<GameLobby userId={ user.id } />
					</PrivateRoute>
					<PrivateRoute path="/dashboard" userId={ user.id }>
						<Dashboard userId={ user.id } />
					</PrivateRoute>

					<Route path="/home">
						<Home userId={ user.id } />
					</Route>
				</Switch>
			</Router>
	);
}

export default App;
