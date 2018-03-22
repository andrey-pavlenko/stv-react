import { Set } from 'immutable';
import { FILE_UPDATE_VIEWED } from '../actions';

const getViewed = () => JSON.parse(localStorage.getItem('viewed') || '[]');

const setViewed = viewed =>
  localStorage.setItem('viewed', JSON.stringify(viewed));

export default (state = Set(getViewed()), action) => {
  switch (action.type) {
  case FILE_UPDATE_VIEWED:
    setViewed(action.payload.toArray());
    return action.payload;
  default:
    return state;
  }
};
