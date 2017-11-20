import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumericalRating extends Component {
  handleChange = event => {
    const { fieldName, onValueChange } = this.props;
    const value = event.target.value;

    onValueChange(value, fieldName);
  };

  render() {
    const { value, fieldName, label } = this.props;

    return (
      <fieldset>
        <label htmlFor={fieldName}>{label}</label>
        <input
          id={fieldName}
          value={value}
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
  value: PropTypes.number,
  fieldName: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
};

NumericalRating.defaultProps = {
  value: 0
};

export default NumericalRating;
