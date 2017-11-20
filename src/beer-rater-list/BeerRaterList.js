import React, { Component } from 'react';
import BeerRater from '../beer-rater/BeerRater';
import './BeerRaterList.css';

class BeerRaterList extends Component {
  render() {
    const numberOfBeers = 12;
    const beers = [];

    for (let i = 1; i <= numberOfBeers; i++) {
      beers.push(
        <li key={i}>
          <BeerRater beerName={'Bjór ' + i} />
        </li>
      );
    }

    return <ul className="beer-rater-list">{beers}</ul>;
  }
}

export default BeerRaterList;
