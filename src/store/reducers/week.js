import { Map } from 'immutable';
import { SET_CURRENT_WEEK } from '../actions';

const defaultState = {
  current: 0
};

export default (state = Map(defaultState), action) => {
  switch (action.type) {
  case SET_CURRENT_WEEK:
    return state.get('current') !== action.payload
      ? state.set('current', action.payload)
      : state;
  default:
    return state;
  }
};
