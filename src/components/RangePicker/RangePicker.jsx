import React, { Component } from 'react';
import { createStaticRanges, DateRangePicker } from "react-date-range";
import { addDays, addMonths, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";

const defineds = {
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOf3DaysAgo: startOfDay(addDays(new Date(), -2)),
};

const staticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Yesterday',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },
  {
    label: 'Last 3 Days',
    range: () => ({
      startDate: defineds.startOf3DaysAgo,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Last Week',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Last Month',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
]);

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
      [ which ]: {
        ...this.state[ which ],
        ...payload,
      },
    });
    const { startDate, endDate } = payload.selection;
    callback(startDate, endDate);
  }

  render() {
    return (
      <DateRangePicker
        staticRanges={staticRanges}
        onChange={this.handleRangeChange.bind(this, 'rangePicker', this.props.onChange)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={3}
        ranges={[ this.state.rangePicker.selection ]}
        direction="horizontal"
        maxDate={new Date()}
      />
    )
  }
}

export default RangePicker;
