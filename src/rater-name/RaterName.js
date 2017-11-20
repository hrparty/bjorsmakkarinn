import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RaterName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    const { onNameChange } = this.props;
    const value = event.target.value;

    this.setState({ value: value }, onNameChange(value));
  };

  render() {
    return (
      <fieldset>
        <label htmlFor="beer-rater-name">Nafn yðar</label>
        <input
          id="beer-rater-name"
          value={this.state.value}
          type="text"
          onChange={this.handleChange}
          placeholder="Sláið inn nafn yðar"
        />
      </fieldset>
    );
  }
}

RaterName.propTypes = {
  onNameChange: PropTypes.func.isRequired
};

export default RaterName;
