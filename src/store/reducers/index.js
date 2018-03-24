import { combineReducers } from 'redux-immutable';
import files from './files';
import week from './week';
import viewed from './viewed';
import downloaded from './downloaded';
import settings from './settings';

export default combineReducers({
  files: files,
  week: week,
  viewed: viewed,
  downloaded: downloaded,
  settings: settings
});
