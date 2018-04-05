import { Map } from 'immutable';
import {
  SETTINGS_SAVE,
  SETTINGS_RENAME_CHANNEL,
  SETTINGS_RESTORE_CHANNEL_NAME,
  SETTINGS_HIDE_CHANNEL
} from '../actions';
import { getItem, setItem } from '../../modules/local-storage';

const defaultState = {
  url: 'http://xmltv.s-tv.ru',
  cors: '',
  login: '',
  password: '',
  timezone: 3,
  interval: 0,
  format: 0,
  hiddenVariants: [],
  hiddenChannels: [],
  renameChannels: {}
};

const getSettings = () => {
  let state = JSON.stringify(defaultState);
  return JSON.parse(getItem('settings', state));
};

const setSettings = settings => setItem('settings', JSON.stringify(settings));

export default (state = Map(getSettings()), action) => {
  switch (action.type) {
  case SETTINGS_SAVE: {
    const newState = state.merge(action.payload);
    setSettings(newState.toJS());
    return newState;
  }
  case SETTINGS_RENAME_CHANNEL: {
    const { id, newName } = action.payload;
    const newState = state.set('renameChannels', {
      ...state.get('renameChannels'),
      [id]: newName
    });
    setSettings(newState.toJS());
    return newState;
  }
  case SETTINGS_RESTORE_CHANNEL_NAME: {
    const renameChannels = { ...state.get('renameChannels') };
    delete renameChannels[action.payload];
    const newState = state.set('renameChannels', renameChannels);
    setSettings(newState.toJS());
    return newState;
  }
  case SETTINGS_HIDE_CHANNEL: {
    const newState = state.set('hiddenChannels', [
      ...state.get('hiddenChannels'),
      action.payload
    ]);
    setSettings(newState.toJS());
    return newState;
  }
  default:
    return state;
  }
};
