import { combineReducers } from 'redux';
import { FetchCardsInfo } from "../actionCreators/actionTypes";

const totalVisitors = (state = {
  count: -1,
  error: null,
  isFetching: false,
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const averageDwellTime = (state = -1, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const peakHour = (state = -1, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const conversionRate = (state = -1, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


export default combineReducers({
  analyticsData: {
    cards: {
      totalVisitors,
      averageDwellTime,
      peakHour,
      conversionRate,
    },
  },
});
