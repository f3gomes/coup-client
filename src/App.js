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
        <div>
          <Switch>
            <Route path="/create">
              <CreateGame></CreateGame>
            </Route>
            <Route path="/join">
              <JoinGame></JoinGame>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
