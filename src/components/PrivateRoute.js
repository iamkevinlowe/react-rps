import React from 'react';
import {
	Redirect,
	Route
} from 'react-router-dom';

function PrivateRoute({ children, userId, ...rest }) {
	return <Route
		{...rest}
		render={({ location }) => userId
			? children
			: <Redirect to={ `/home?redirectTo=${location.pathname}` } />
		} />;
}

export default PrivateRoute;
