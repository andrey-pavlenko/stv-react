import { OrderedSet } from 'immutable';

// TODO: memorize selectors

/**
 * Get global store
 *
 * @returns {Object}
 */
const getState = () => {
  const state = require('./index').default;
  return state.getState();
};

/**
 * Get all weeks in files/items
 *
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
 * Get current selected week
 *
 * @param {*} state
 * @returns {Number}
 */
export const getCurrentWeek = state => state.getIn(['week', 'current']);

/**
 * Get files/items for current week
 *
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

/**
 * Get first files/items by urlId
 *
 * @param {Number} urlId
 * @returns {Object}
 */
export const getFileItem = urlId =>
  getState()
    .getIn(['files', 'items'])
    .find(item => item.urlId === urlId) || null;

/**
 * Get list pending status
 *
 * @param {Boolean} state
 */
export const getFilesRequestPending = state =>
  state.getIn(['files', 'pending']);
