import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/loginPage/loginComponent";
import SignUp from "./components/loginPage/signupComponent";
import BotListPage from './components/botListPage/BotListPage';


function App() {
  return (<Router>
    <div className="App">
        
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/list" component={BotListPage} />
          </Switch>
       
    </div></Router>
  );
}

export default App;
