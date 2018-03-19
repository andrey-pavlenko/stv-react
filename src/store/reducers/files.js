import { Map, List } from 'immutable';

import items from './s-tv-list.json';

const defaultState = {
  pending: false,
  items: List(items),
  error: ''
};

export default (state = Map(defaultState), action) => {
  return state;
};
