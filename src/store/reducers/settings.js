import { Map } from 'immutable';
import { SETTINGS_SAVE } from '../actions';

const defaultState = {
  url: 'http://xmltv.s-tv.ru',
  cors: 'https://cors.io/?',
  login: '',
  password: '',
  timezone: 3,
  interval: 0,
  format: 0,
  hiddenVariants: [],
  hiddenChannels: [],
  renameChannels: {}
};

const getSettings = () =>
  JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultState));

const setSettings = settings =>
  localStorage.setItem('settings', JSON.stringify(settings));

export default (state = Map(getSettings()), action) => {
  switch (action.type) {
  case SETTINGS_SAVE: {
    const newState = state.merge(action.payload);
    setSettings(newState.toJS());
    return newState;
  }
  default:
    return state;
  }
};
