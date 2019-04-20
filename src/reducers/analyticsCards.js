import { Reducer } from 'redux';
import { FetchStoksAction, FetchStoksType } from '../actionCreators/stoks';
import { FetchCardsInfo } from '../actionCreators/actionTypes';

const defaultCards = {
  isLoading: false,
  isLoaded: false,
  data: {
    totalVisitors: null,
    averageDwellTime: null,
    peakHour: null,
    conversionRate: null,
  },
  error: null,
};

export const cardsReducer = (cards = defaultCards, action) => {
  switch (action.type) {
    case FetchCardsInfo.START:
      return {
        ...cards,
        isLoading: true,
        isLoaded: false,
      };
    case FetchCardsInfo.SUCCESS:
      return {
        ...cards,
        isLoading: false,
        isLoaded: true,
      };
    case FetchCardsInfo.ERROR:
      return {
        ...cards,
        isLoading: false,
        isLoaded: true,
        error: action.error,
      };
    default:
      return cards;
  }
};