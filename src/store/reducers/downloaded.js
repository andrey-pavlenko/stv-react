import { Set } from 'immutable';
import { FILE_UPDATE_DOWNLOADED } from '../actions';

const getDownloaded = () =>
  JSON.parse(localStorage.getItem('downloaded') || '[]');

const setDownloaded = downloaded =>
  localStorage.setItem('downloaded', JSON.stringify(downloaded));

export default (state = Set(getDownloaded()), action) => {
  switch (action.type) {
  case FILE_UPDATE_DOWNLOADED:
    setDownloaded(action.payload.toArray());
    return action.payload;
  default:
    return state;
  }
};
