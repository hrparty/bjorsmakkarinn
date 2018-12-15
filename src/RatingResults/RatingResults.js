import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { db } from "../firebase";
import { beerIds, addTotalRating, averageRatingByBeer } from "./calculator";
import BeerResults from "./BeerResults";

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

    const avgColors = averageRatingByBeer(allRatings, "color");
    const avgSmell = averageRatingByBeer(allRatings, "smell");
    const avgTaste = averageRatingByBeer(allRatings, "taste");
    const avgXmas = averageRatingByBeer(allRatings, "xmas");
    const avgTotal = averageRatingByBeer(allRatings, "total");
    const options = {
      scales: {
        xAxes: [
          {
            ticks: {
              max: 10
            }
          }
        ]
      }
    };

    return (
      <div className="rating-results">
        <h1>Hér eru niðurstöður dómnefndar</h1>

        <h2>Glæsilegasti bjórinn</h2>
        <HorizontalBar
          options={options}
          data={{
            labels: avgColors.map(c => c.beerId),
            datasets: [
              {
                label: "Glæsilegasti bjórinn",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: avgColors.map(c => c.colorAvg)
              }
            ]
          }}
        />

        <h2>Fnykbesti bjórinn</h2>
        <HorizontalBar
          options={options}
          data={{
            labels: avgSmell.map(c => c.beerId),
            datasets: [
              {
                label: "Fnykbesti bjórinn",
                backgroundColor: "rgba(23,153,14,0.2)",
                borderColor: "rgba(23,153,14,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(23,153,14,0.4)",
                hoverBorderColor: "rgba(23,153,14,1)",
                data: avgSmell.map(c => c.smellAvg)
              }
            ]
          }}
        />

        <h2>Bragðbesti bjórinn</h2>
        <HorizontalBar
          options={options}
          data={{
            labels: avgTaste.map(c => c.beerId),
            datasets: [
              {
                label: "Bragðbesti bjórinn",
                backgroundColor: "rgba(0,219,255,0.2)",
                borderColor: "rgba(0,219,255,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(0,219,255,0.4)",
                hoverBorderColor: "rgba(0,219,255,1)",
                data: avgTaste.map(c => c.tasteAvg)
              }
            ]
          }}
        />

        <h2>Mesti jólaandinn</h2>
        <HorizontalBar
          options={options}
          data={{
            labels: avgXmas.map(c => c.beerId),
            datasets: [
              {
                label: "Mesti jólaandinn",
                backgroundColor: "rgba(232,150,12,0.2)",
                borderColor: "rgba(232,150,12,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(232,150,12,0.4)",
                hoverBorderColor: "rgba(232,150,12,1)",
                data: avgXmas.map(c => c.xmasAvg)
              }
            ]
          }}
        />

        <h2>Bestur á landi hér</h2>
        <HorizontalBar
          options={options}
          data={{
            labels: avgTotal.map(c => c.beerId),
            datasets: [
              {
                label: "Bestur á landi hér",
                backgroundColor: "rgba(84,12,232,0.2)",
                borderColor: "rgba(84,12,232,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(84,12,232,0.4)",
                hoverBorderColor: "rgba(84,12,232,1)",
                data: avgTotal.map(c => c.totalAvg)
              }
            ]
          }}
        />

        <h2>Allar niðurstöður</h2>
        {beerIds().map(bid => {
          return <BeerResults bid={bid} allRatings={allRatings} />;
        })}
      </div>
    );
  }
}

export default RatingResults;
