import React from "react";
import Home from "./components/Home";
import JoinGame from "./components/JoinGame";
import CreateGame from "./components/CreateGame";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="mainContainer">
          <Switch>
            <Route path="/create">
              <CreateGame />
            </Route>
            <Route path="/join">
              <JoinGame />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
