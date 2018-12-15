import React from "react";

class BeerResults extends React.Component {
  render() {
    const { bid, allRatings } = this.props;

    return (
      <div>
        <h3>Bjór {bid}</h3>
        <>
          {allRatings
            .filter(b => b.beerId === bid)
            .map(b => {
              return (
                <>
                  <h4>{b.userId} hefur þetta að segja:</h4>
                  <p>Umsögn: {b.comment}</p>
                  <ul>
                    <li>Litur: {b.colorRating}</li>
                    <li>Fnykur: {b.smellRating}</li>
                    <li>Bragð: {b.tasteRating}</li>
                    <li>Jólaandi: {b.xmasRating}</li>
                    <li>Heild: {b.totalRating}</li>
                  </ul>
                </>
              );
            })}
        </>
      </div>
    );
  }
}

export default BeerResults;
