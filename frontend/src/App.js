import React from "react";
import "./electronScript";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import login from "./components/loginPage/Login";
import BotListPage from "./components/botListPage/BotListPage";
import BotBuildPage from "./components/botEditPage/BotBuildPage";
import DataSetPage from './components/DataSetPage/DatasetPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={BotListPage} />
          <Route exact path="/list" component={BotListPage} />
          <Route exact path="/build" component={BotBuildPage} />
          <Route exact path="/dataset" component={DataSetPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
