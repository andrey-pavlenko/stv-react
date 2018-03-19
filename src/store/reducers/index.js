import { combineReducers } from 'redux-immutable';
import files from './files';
import week from './week';

export default combineReducers({
  files: files,
  week: week
});
