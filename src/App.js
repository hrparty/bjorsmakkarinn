import React, { Component } from "react";
import firebase from "./firebase";
import BeerRaterList from "./beer-rater-list/BeerRaterList";
import Login from "./login/Login";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.user ? <BeerRaterList user={this.state.user} /> : <Login />}
      </div>
    );
  }
}

export default App;
