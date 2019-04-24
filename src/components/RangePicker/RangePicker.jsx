import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class RangePicker extends Component {
  state = {
    rangePicker: {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: '#3f51b5',
      },
    },
  };

  handleRangeChange(which, callback, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
    const { startDate, endDate } = payload.selection;
    callback(startDate, endDate);
  }

  render() {
    return (
      <DateRange
        onChange={this.handleRangeChange.bind(this, 'rangePicker', this.props.onChange)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={3}
        ranges={[this.state.rangePicker.selection]}
        direction="horizontal"
        maxDate={new Date()}
      />
    )
  }
}

export default RangePicker;
