const R = require('ramda');
const Utils = require('./utils');
const Task = require('data.task');

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
  return hasEnumerate(x).fold(e => false, r => Utils.isFunction(r));
}


const enumerateDevices = () =>
    if (supportsEnumerate) {
      return navigator.mediaDevices.enumerateDevices().then(R.indentity, R.indentity)
    }
    return 'Error:: enumerate devices not supported';
  });

const listDevices = () => enumerateDevices();

exports = module.exports = {
  isBrowser,
  isNode,
  supportsEnumerate,
  listDevices
}