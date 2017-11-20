import React, { Component } from 'react';
import BeerRaterList from './beer-rater-list/BeerRaterList';
import RaterName from './rater-name/RaterName';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raterName: ''
    };
  }

  handleRaterNameChanged = newName => {
    this.setState({ raterName: newName });
  };

  render() {
    return (
      <div className="app">
        <RaterName onNameChange={this.handleRaterNameChanged} />
        <BeerRaterList />
      </div>
    );
  }
}

export default App;
