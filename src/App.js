import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./firebase";
import BeerRaterList from "./BeerRaterList/BeerRaterList";
import RatingResults from "./RatingResults/RatingResults";
import Login from "./Login/Login";
import "./App.scss";

const NotFound = () => <div>Page not found!</div>;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    return (
      <div className="app">
        {!this.state.user ? (
          <Login />
        ) : (
          <Router>
            <Switch>
              <Route path="/" exact component={BeerRaterList} />
              <Route path="/rating/:id/results" component={RatingResults} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
