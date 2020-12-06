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
import SideBar from "./components/layout/general/Sidebar";
import Templates from "./components/Templates";
import Notifications from "./components/Notifications";
import Academy from "./components/Academy";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalContextProvider>
        <ModalManager />
        <ToastrManager />
        <Router>
          <SideBar />
          <Box py={4} pl={32} pr={4}>
            <Route exact path="/" component={BotListPage} />
            <Route exact path="/templates" component={Templates} />
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
