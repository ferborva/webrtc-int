const R = require('ramda');
const Utils = require('./utils');

/**
 * isBrowser - Browser environment detection
 * Predicate
 * @return {Boolean}
 */
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

/**
 * isNode - Node.js environment detection
 * Predicate
 * @return {Boolean}
 */
const isNode = new Function("try {return this===global;}catch(e){return false;}");

/**
 * Safe look for enumerateDevices key in nested object (navigator lookup)
 * @param  {Object} Object to look in
 * @return {Either}
 *
 * hasEnumerate:: x -> Either(string value)
 */
const hasEnumerate = R.composeK(Utils.safeProp('enumerateDevices'),
                                Utils.safeProp('mediaDevices'),
                                Utils.safeProp('navigator'));

/**
 * Predicate - Verifies if enumerate Devices is supported
 * @type {Boolean}
 */
const supportsEnumerate = (x) => {
  x = x || window
  return !isBrowser() ? false
                      : hasEnumerate(x).fold(e => false, r => Utils.isFunction(r));
}

exports = module.exports = {
  isBrowser,
  isNode,
  supportsEnumerate
}