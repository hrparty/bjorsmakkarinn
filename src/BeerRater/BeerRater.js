import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "../Rating/Rating";
import "./BeerRater.scss";

class BeerRater extends Component {
  doStateUpdate = update => {
    const {
      beerId,
      colorRating,
      smellRating,
      tasteRating,
      totalRating,
      comment,
      onRatingChange
    } = this.props;

    onRatingChange(
      Object.assign(
        { beerId, colorRating, smellRating, tasteRating, totalRating, comment },
        update
      )
    );
  };

  handleRatingChange = (newValue, fieldId) => {
    newValue = parseFloat(newValue);

    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;

    this.doStateUpdate({ [fieldId]: newValue });
  };

  handleCommentChange = event => {
    this.doStateUpdate({ comment: event.target.value });
  };

  render() {
    const { beerId, beerName } = this.props;
    const fieldNames = [
      "colorRating",
      "smellRating",
      "tasteRating",
      "totalRating"
    ];
    const labels = ["Litur", "Fnykur", "Bragð", "Andi jólanna"];

    return (
      <form>
        <h2>{beerName}</h2>
        <ul className="beer-rater">
          {fieldNames.map((fieldName, i) => {
            const fieldId = fieldName + beerId;
            return (
              <li key={fieldId}>
                <Rating
                  value={this.props[fieldName]}
                  fieldName={fieldName}
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
              value={this.props.comment}
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
  onRatingChange: PropTypes.func.isRequired,
  colorRating: PropTypes.number,
  smellRating: PropTypes.number,
  tasteRating: PropTypes.number,
  totalRating: PropTypes.number,
  comment: PropTypes.string
};

BeerRater.defaultProps = {
  colorRating: 0,
  smellRating: 0,
  tasteRating: 0,
  totalRating: 0,
  comment: ""
};

export default BeerRater;
