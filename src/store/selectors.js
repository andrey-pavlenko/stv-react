import { OrderedSet, Set } from 'immutable';

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
 * Get files items
 *
 * @returns {List}
 */
export const getFileItems = state => state.getIn(['files', 'items']);

/**
 * Get first files/items by urlId
 *
 * @param {Number} urlId
 * @returns {Object}
 */
export const getFileItem = urlId =>
  getFileItems(getState()).find(item => item.urlId === urlId) || null;

/**
 * Get list pending status
 *
 * @param {Boolean} state
 */
export const getFilesRequestPending = state =>
  state.getIn(['files', 'pending']);

/**
 * Returns Set of item.urlId
 *
 * @param {Object} state
 * @returns {Set}
 */
export const getItemUrlIds = state =>
  Set(state.getIn(['files', 'items']).map(item => item.urlId));

/**
 * Returns Set of viewed urlIds
 *
 * @param {Set} state
 */
export const getViewedUrlIds = state => state.get('viewed');

/**
 * Returns Set of downloaded urlIds
 *
 * @param {Set} state
 */
export const getDownloadedUrlIds = state => state.get('downloaded');

/**
 * Returns settings data
 *
 * @param {Map} state
 */
export const getSettings = state => state.get('settings');

/**
 * Return renamed channel name state.settings.renameChannels[id]
 *
 * @param {String} id
 */
export const getChannelName = id =>
  getSettings(getState()).get('renameChannels')[id];
