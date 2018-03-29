// Based on https://github.com/darkskyapp/string-hash/blob/master/index.js

/**
 * @param {String} str
 * @returns {Number}
 */
export default str => {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
};
