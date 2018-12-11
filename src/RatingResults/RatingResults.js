import React from "react";
import { db } from "../firebase";

class RatingResults extends React.Component {
  constructor(props) {
    super(props);

    this.ratingSessionId = props.match.params.id;
    this.dbUnsubscribe = null;

    this.state = {
      allRatings: []
    };
  }

  componentDidMount() {
    this.dbUnsubscribe = db
      .collection("beerRatings")
      .where("ratingSessionId", "==", this.ratingSessionId)
      .onSnapshot(querySnapshot => {
        const allRatings = [];

        querySnapshot.foreach(document => {
          allRatings.push(document.data());
        });

        this.setState({
          allRatings: allRatings
        });
      });
  }

  componentWillUnmount() {
    if (this.dbUnsubscribe) {
      this.dbUnsubscribe();
    }
  }

  render() {
    return (
      <ul>
        {this.state.allRatings.map(rating => (
          <li>{rating.beerId}</li>
        ))}
      </ul>
    );
  }
}

export default RatingResults;
