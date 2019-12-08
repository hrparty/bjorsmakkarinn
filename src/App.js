import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useUser from "./hooks/useUser";
import BeerRaterList from "./BeerRaterList/BeerRaterList";
import RatingResults from "./RatingResults/RatingResults";
import SessionList from "./SessionList/SessionList";
import Login from "./Login/Login";
import "./App.scss";

const NotFound = () => <div>Page not found!</div>;

const App = () => {
  const user = useUser();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact component={SessionList} />
            <Route path="/session/:id" exact component={BeerRaterList} />
            <Route path="/session/:id/results" component={RatingResults} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
