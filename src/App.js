import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Wall from './components/Wall/Wall';
import { Routes } from './routes';

function App() {
	return (
		<div className="App">
			<Router >
				<Switch>
					<Route exact={true} path={Routes.wall}>
						<Wall />
					</Route>
					<Route exact={true} path={Routes.post}>
						<PostDetails />
					</Route>
					<Redirect to={Routes.wall} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
