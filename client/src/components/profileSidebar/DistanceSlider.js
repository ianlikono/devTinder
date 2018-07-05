import { Slider } from 'antd';
import React, { Component } from 'react';

class DistanceSlider extends Component {
  state = {
    disabled: false,
  };

  handleDisabledChange = (disabled) => {
    this.setState({ disabled });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <Slider defaultValue={30} disabled={disabled} />
      </div>
    );
  }
}

export default DistanceSlider;
