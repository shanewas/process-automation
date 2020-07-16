import React from "react";
import "./electronScript";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import login from "./components/loginPage/Login";
import BotListPage from "./components/botListPage/BotListPage";
import BotBuildPage from "./components/botEditPage/BotBuildPage";
import DataSetPage from "./components/DataSetPage/DatasetPage";
import { ModalContextProvider } from "./context/ModalContext";
import ModalManager from "./components/modals/ModalManager";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalContextProvider>
        <ModalManager />
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={BotListPage} />
              <Route exact path="/list" component={BotListPage} />
              <Route exact path="/build" component={BotBuildPage} />
              <Route exact path="/dataset" component={DataSetPage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </ModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
