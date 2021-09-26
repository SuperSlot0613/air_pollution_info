import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchCities from "./SearchCities";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/">
            <h1>Know Air Pollution</h1>
            <SearchCities />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
