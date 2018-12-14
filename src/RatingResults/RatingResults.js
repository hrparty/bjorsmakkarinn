import React from "react";
import { db } from "../firebase";
import { addTotalRating, averageRatingByBeer } from "./calculator";

class RatingResults extends React.Component {
  constructor(props) {
    super(props);

    this.ratingSessionId = parseInt(props.match.params.id);
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

        querySnapshot.forEach(document => {
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
    let { allRatings } = this.state;
    allRatings = addTotalRating(allRatings);

    return (
      <div className="rating-results">
        <h1>Hér eru niðurstöður dómnefndar</h1>

        <h2>Glæsilegasti bjórinn</h2>
        <ul>
          {averageRatingByBeer(allRatings, "color").map(b => (
            <li>
              {b.beerId} - {b.colorAvg}
            </li>
          ))}
        </ul>

        <h2>Fnykbesti bjórinn</h2>
        <ul>
          {averageRatingByBeer(allRatings, "smell").map(b => (
            <li>
              {b.beerId} - {b.smellAvg}
            </li>
          ))}
        </ul>

        <h2>Bragðbesti bjórinn</h2>
        <ul>
          {averageRatingByBeer(allRatings, "taste").map(b => (
            <li>
              {b.beerId} - {b.tasteAvg}
            </li>
          ))}
        </ul>

        <h2>Mesti jólaandinn</h2>
        <ul>
          {averageRatingByBeer(allRatings, "xmas").map(b => (
            <li>
              {b.beerId} - {b.xmasAvg}
            </li>
          ))}
        </ul>

        <h2>Bestur á landi hér</h2>
        <ul>
          {averageRatingByBeer(allRatings, "total").map(b => (
            <li>
              {b.beerId} - {b.totalAvg}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RatingResults;
