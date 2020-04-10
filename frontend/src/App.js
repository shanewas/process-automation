import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import login from "./components/loginPage/Login";
import Navbarup from "./components/navBar/Navbarup";

// import BotDetails from './pages/bots/BotDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={login} />
          <Navbarup />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
