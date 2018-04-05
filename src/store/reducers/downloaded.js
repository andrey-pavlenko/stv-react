import { Set } from 'immutable';
import { FILE_UPDATE_DOWNLOADED } from '../actions';
import { getItem, setItem } from '../../modules/local-storage';

const getDownloaded = () => JSON.parse(getItem('downloaded') || '[]');

const setDownloaded = downloaded =>
  setItem('downloaded', JSON.stringify(downloaded));

export default (state = Set(getDownloaded()), action) => {
  switch (action.type) {
  case FILE_UPDATE_DOWNLOADED:
    setDownloaded(action.payload.toArray());
    return action.payload;
  default:
    return state;
  }
};
