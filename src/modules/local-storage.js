/**
 * Catch localStorage exception
 *
 * @param {String} name
 * @param {String} defaultValue
 * @returns {String}
 */
export const getItem = (name, defaultValue = 'null') => {
  try {
    return localStorage.getItem(name) || defaultValue;
  } catch (error) {
    console.log('localStorage.getItem error:', error.message);
    return defaultValue;
  }
};

/**
 * Catch localStorage exception
 *
 * @param {String} name
 * @param {String} value
 */
export const setItem = (name, value) => {
  try {
    localStorage.setItem(name, value);
  } catch (error) {
    console.log('localStorage.setItem error:', error.message);
  }
};
