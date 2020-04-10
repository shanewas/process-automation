import React from "react";
import "./electronScript";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from "./components/loginPage/Login";
// import Navbar from './components/navBar/NavBar'
import BotListPage from "./components/botListPage/BotListPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/list" component={BotListPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
