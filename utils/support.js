const R = require('./ramda_subset');
const Utils = require('./index');
/**
 * Safe look for mediaDevices API
 * @param  {Object} Object to look in
 * @return {Either}
 *
 * hasMediaDevices:: x -> Either(string value)
 */
const hasMediaDevices = R.composeK(Utils.safeProp('mediaDevices'),
                                   Utils.safeProp('navigator'));

/**
 * Safe look for enumerateDevices API (navigator lookup)
 * @param  {Object} Object to look in
 * @return {Either}
 *
 * hasEnumerate:: x -> Either(string value)
 */
const hasEnumerate = R.composeK(Utils.safeProp('enumerateDevices'),
                                hasMediaDevices);

/**
 * Safe look for getSupportedConstraints API (navigator lookup)
 * @param  {Object} Object to look in
 * @return {Either}
 *
 * hasEnumerate:: x -> Either(string value)
 */
const hasSupportedConstraints = R.composeK(Utils.safeProp('getSupportedConstraints'),
                                           hasMediaDevices);

/**
 * Safe look for getUserMedia API (navigator lookup)
 * @param  {Object} Object to look in
 * @return {Either}
 *
 * hasEnumerate:: x -> Either(string value)
 */
const hasGetUserMedia = R.composeK(Utils.safeProp('getUserMedia'),
                                   hasMediaDevices);

/**
 * Predicate - Verifies if Enumerate Devices exists and is a function
 * @type {Boolean}
 */
const enumerate = (x) => {
  x = x || window
  return hasEnumerate(x).fold(e => false, r => Utils.isFunction(r));
}

/**
 * Predicate - Verifies if Enumerate Devices exists and is a function
 * @type {Boolean}
 */
const availableConstraints = (x) => {
  x = x || window
  return hasSupportedConstraints(x).fold(e => false, r => Utils.isFunction(r));
}

/**
 * Predicate - Verifies if Enumerate Devices exists and is a function
 * @type {Boolean}
 */
const userMedia = (x) => {
  x = x || window
  return hasGetUserMedia(x).fold(e => false, r => Utils.isFunction(r));
}

exports = module.exports = {
  enumerate,
  availableConstraints,
  userMedia
}