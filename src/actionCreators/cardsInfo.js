import { FetchCardsInfo } from './actionTypes';
import { CISCO_PRESENCE } from '../api/http';

export const fetchCardsInfoActionCreator = () => {
  return async dispatch => {
    dispatch({
      type: FetchCardsInfo.START,
    });
    try {
      const response = await CISCO_PRESENCE('/api/config/v1/sites');
      dispatch({
        type: FetchCardsInfo.SUCCESS,
        payload: { response },
      })
    } catch (e) {
      dispatch({
        type: FetchCardsInfo.ERROR,
        payload: {
          error: e,
        },
      })
    }
  }
};
