import { Map, List } from 'immutable';
import { FILES_REQUEST_PENDING, FILES_REQUEST_SUCCESS } from '../actions';

const defaultState = {
  pending: false,
  items: List(),
  error: ''
};

export default (state = Map(defaultState), action) => {
  switch (action.type) {
  case FILES_REQUEST_PENDING:
    return state.set('pending', action.payload);
  case FILES_REQUEST_SUCCESS:
    return state.set('pending', false).set('items', List(action.payload));
  default:
    return state;
  }
};
