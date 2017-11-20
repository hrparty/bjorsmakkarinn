import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumericalRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = event => {
    const { fieldName, onValueChange } = this.props;
    const value = event.target.value;

    this.setState(
      { value: event.target.value },
      onValueChange(value, fieldName)
    );
  };

  render() {
    const { fieldName, label } = this.props;

    return (
      <fieldset>
        <label htmlFor={fieldName}>{label}</label>
        <input
          id={fieldName}
          value={this.state.value}
          type="number"
          min="0"
          max="10"
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

NumericalRating.propTypes = {
  fieldName: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
};

export default NumericalRating;
