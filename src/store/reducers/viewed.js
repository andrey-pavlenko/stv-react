import { Set } from 'immutable';
import { FILE_UPDATE_VIEWED } from '../actions';
import { getItem, setItem } from '../../modules/local-storage';

const getViewed = () => JSON.parse(getItem('viewed') || '[]');

const setViewed = viewed => setItem('viewed', JSON.stringify(viewed));

export default (state = Set(getViewed()), action) => {
  switch (action.type) {
  case FILE_UPDATE_VIEWED:
    setViewed(action.payload.toArray());
    return action.payload;
  default:
    return state;
  }
};
