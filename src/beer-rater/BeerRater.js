import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "../rating/Rating";
import "./BeerRater.scss";

class BeerRater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorRating: 0,
      smellRating: 0,
      tasteRating: 0,
      comment: ""
    };
  }

  doStateUpdate = update => {
    const { beerId, onRatingChange } = this.props;

    onRatingChange(Object.assign({ beerId: beerId }, this.state, update));
    this.setState(update);
  };

  handleRatingChange = (newValue, fieldId) => {
    // Do some stupid client side stuff to avoid values that are not allowed
    newValue = Math.round(Number(newValue));
    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;

    this.doStateUpdate({ [fieldId]: newValue });
  };

  handleCommentChange = event => {
    this.doStateUpdate({ comment: event.target.value });
  };

  render() {
    const { beerId, beerName } = this.props;
    const fieldNames = ["colorRating", "smellRating", "tasteRating"];
    const labels = ["Litur", "Fnykur", "Bragð"];

    return (
      <form>
        <h2>{beerName}</h2>
        <ul className="beer-rater">
          {fieldNames.map((fieldName, i) => {
            const fieldId = fieldName + beerId;
            return (
              <li key={fieldId}>
                <Rating
                  value={this.state[fieldId]}
                  fieldName={fieldId}
                  label={labels[i]}
                  onValueChange={this.handleRatingChange}
                />
              </li>
            );
          })}
          <li className="beer-rater-comments">
            <label htmlFor={"umsogn" + beerId}>Umsögn</label>
            <textarea
              id={"umsogn" + beerId}
              value={this.state.comment}
              onChange={this.handleCommentChange}
              placeholder="Yðar umsögn um bjórinn"
            />
          </li>
        </ul>
      </form>
    );
  }
}

BeerRater.propTypes = {
  beerId: PropTypes.number.isRequired,
  beerName: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired
};

export default BeerRater;
