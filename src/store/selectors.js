import { OrderedSet } from 'immutable';

const getState = () => {
  const state = require('./index').default;
  return state.getState();
};

/**
 * @param {*} state
 * @returns {OrderedSet}
 */
export const getWeeks = state =>
  OrderedSet(
    state
      .getIn(['files', 'items'])
      .map(item => item.week)
      .sort()
  );

/**
 * @param {*} state
 * @returns {Number}
 */
export const getCurrentWeek = state => state.getIn(['week', 'current']);

/**
 * @param {*} state
 * @returns {List}
 */
export const getCurrentWeekFileItems = state => {
  const week = getCurrentWeek(state);
  return state
    .getIn(['files', 'items'])
    .filter(item => item.week === week)
    .sort((a, b) => b.time - a.time);
};

export const getFileItem = urlId =>
  getState()
    .getIn(['files', 'items'])
    .find(item => item.urlId === urlId);
