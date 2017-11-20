import React, { Component } from 'react';
import BeerRaterList from './beer-rater-list/BeerRaterList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BeerRaterList />
      </div>
    );
  }
}

export default App;
