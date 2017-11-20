import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericalRating from './NumericalRating';
import './BeerRater.css';

class BeerRater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorRating: 0,
      smellRating: 0,
      tasteRating: 0,
      comment: ''
    };
  }

  handleRatingChange = (value, fieldName) => {};

  handleCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { beerName } = this.props;
    const fieldNames = ['colorRating', 'smellRating', 'tasteRating'];
    const labels = ['Litur', 'Fnykur', 'Bragð'];

    return (
      <form>
        <h2>{beerName}</h2>
        <ul className="beer-rater">
          {fieldNames.map((fieldName, i) => (
            <li key={fieldName}>
              <NumericalRating
                fieldName={fieldName}
                label={labels[i]}
                onValueChange={this.handleRatingChange}
              />
            </li>
          ))}
          <li className="beer-rater-comments">
            <textarea
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

BeerRater.PropTypes = {
  beerName: PropTypes.number.isRequired
};

export default BeerRater;
