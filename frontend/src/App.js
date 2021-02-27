import React from "react";
import "./electronScript";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import login from "./components/loginPage/Login";
import BotListPage from "./components/BotListPage";
import BotBuildPage from "./components/BotBuildPage/";
// import DataSetPage from "./components/DataSetPage/DatasetPage";
import { ModalContextProvider } from "./context/ModalContext";
import ModalManager from "./components/modals/ModalManager";
import { ThemeProvider, CssBaseline, Box } from "@material-ui/core";
import theme from "./theme";
import ToastrManager from "./components/toastrs/ToastrManager";
import SideBar from "./components/layout/general/SideBar";
import Marketplace from "./components/Marketplace";
import Notifications from "./components/Notifications";
import Academy from "./components/Academy";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalContextProvider>
        <Router>
          <ModalManager />
          <ToastrManager />
          <Route exact path="/" component={Auth} />
          <SideBar />
          <Box py={4} pl={32} pr={4}>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/bot-list" component={BotListPage} />
            <Route exact path="/marketplace" component={Marketplace} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/academy" component={Academy} />
            <Route exact path="/build" component={BotBuildPage} />
          </Box>
        </Router>
      </ModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
