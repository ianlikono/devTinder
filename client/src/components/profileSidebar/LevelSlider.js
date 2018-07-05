import { Slider } from 'antd';
import React, { Component } from 'react';

class LevelSlider extends Component {
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
        <Slider min={1} max={3} range step={1} defaultValue={[1, 3]} disabled={disabled} />
      </div>
    );
  }
}

export default LevelSlider;
