import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Rating.scss";

class Rating extends Component {
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
          step="0.5"
          onChange={this.handleChange}
          className="value-selector"
        />
        <span className="value-display">{value}</span>
      </fieldset>
    );
  }
}

Rating.propTypes = {
  value: PropTypes.number,
  fieldName: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
};

Rating.defaultProps = {
  value: 0
};

export default Rating;
