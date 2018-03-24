import { Map } from 'immutable';

// TODO: Remove test login
const defaultState = {
  url: 'http://xmltv.s-tv.ru',
  cors: 'https://cors.io/?',
  login: 'test',
  password: '',
  timezone: 3,
  interval: 0,
  format: 0,
  hiddenVariants: [],
  hiddenChannels: {},
  renameChannels: {}
};

const getSettings = () =>
  JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultState));

// const setSettings = settings =>
//   localStorage.setItem('settings', JSON.stringify(settings));

export default (state = Map(getSettings()), action) => {
  switch (action.type) {
  default:
    return state;
  }
};
