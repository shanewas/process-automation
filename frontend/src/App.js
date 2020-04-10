import React from 'react';
import './electronScript' 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import login from './components/loginPage/Login'
// import BotDetails from './pages/bots/BotDetails'

function App() {
	
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/' component={login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
