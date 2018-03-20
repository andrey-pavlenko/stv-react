import { combineReducers } from 'redux-immutable';
import files from './files';
import week from './week';

// TODO: add viewed, downloaded

export default combineReducers({
  files: files,
  week: week
});
