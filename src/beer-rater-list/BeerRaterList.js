import React, { Component } from "react";
import firebase from "../firebase";
import BeerRater from "../beer-rater/BeerRater";
import "./BeerRaterList.css";

class BeerRaterList extends Component {
  constructor(props) {
    super(props);

    this.intervalId = null;
    this.ratingState = {};
    this.lastSavedState = {};
    this.ratingSessionId = 1;
    this.storageKey = `beerRater:ratingState:${
      firebase.auth().currentUser.uid
    }:${this.ratingSessionId}`;

    this.state = {
      beers: {}
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.saveToDb, 20000);

    const prevSession = localStorage.getItem(this.storageKey);

    if (prevSession) {
      this.setState({
        beers: JSON.parse(prevSession)
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  saveToDb = () => {
    const userId =
      firebase.auth().currentUser && firebase.auth().currentUser.uid;

    if (!userId) return;

    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    Object.keys(this.state.beers).forEach(key => {
      const dbUpdate = Object.assign({}, this.state.beers[key], {
        ratingSessionId: this.ratingSessionId,
        userId: userId
      });

      // Only update if data changed
      if (this.lastSavedState[key] === JSON.stringify(dbUpdate)) return;

      const documentId = `${key}:${this.ratingSessionId}:${userId}`;
      const dbUpdateWithMetadata = Object.assign({}, dbUpdate, {
        updatedAt: Date.now()
      });

      db.collection("beerRatings")
        .doc(documentId)
        .set(dbUpdateWithMetadata)
        .then(() => {
          console.log("Data saved to db", dbUpdateWithMetadata);
          this.lastSavedState[key] = JSON.stringify(dbUpdate);
        });
    });
  };

  handleRatingChange = newRating => {
    const newState = Object.assign({}, this.state.beers);

    newState[newRating.beerId] = newRating;
    localStorage.setItem(this.storageKey, JSON.stringify(newState));

    console.log("Setting new state", newState);

    this.setState({
      beers: newState
    });
  };

  render() {
    const numberOfBeers = 16;
    const beers = [];

    for (let i = 1; i <= numberOfBeers; i++) {
      const beerData = this.state.beers[i] || {};

      beers.push(
        <li key={i}>
          <BeerRater
            beerId={i}
            beerName={"Bjór " + i}
            colorRating={beerData.colorRating}
            smellRating={beerData.smellRating}
            tasteRating={beerData.tasteRating}
            comment={beerData.comment}
            onRatingChange={this.handleRatingChange}
          />
        </li>
      );
    }

    return <ul className="beer-rater-list">{beers}</ul>;
  }
}

export default BeerRaterList;
