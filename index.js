const R = require('ramda');
const Utils = require('./utils/index');
const Task = require('data.task');

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
 * Predicate - Verifies if Enumerate Devices exists and is a function
 * @type {Boolean}
 */
const supportsEnumerate = (x) => {
  x = x || window
  return hasEnumerate(x).fold(e => false, r => Utils.isFunction(r));
}

/**
 * Predicate - Verifies if Enumerate Devices exists and is a function
 * @type {Boolean}
 */
const supportsAvailableConstraints = (x) => {
  x = x || window
  return hasSupportedConstraints(x).fold(e => false, r => Utils.isFunction(r));
}

/**
 * Task - Safe Enumerate Devices Wrapper
 * @return {Task}
 */
const listDevices = new Task((rej, res) => {
  if (supportsEnumerate) {
    navigator.mediaDevices.enumerateDevices().then(r => {
      res(r)
    }, e => {
      rej(e)
    })
  } else {
    rej(new Error('Enumerate devices not supported'));
  }
})

/**
 * Promise - Safe Enumerate Devices Wrapper
 * @return {Promise}
 */
const listDevicesP = () => {
  return new Promise((res, rej) => {
    if (supportsEnumerate) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        res(devices)
      }, err => {
        rej(err)
      })
    } else {
      rej(new Error('Enumerate devices not supported'));
    }
  })
}

/**
 * Task - Filtered list of Devices
 * Only Input Devices (Audio & Video)
 * @return {Task}
 */
const listInputDevices = () => {
  return listDevices.map(R.filter(Utils.isKindInput))
}

/**
 * Promise - Filtered list of Devices
 * Only Input Devices (Audio & Video)
 * @return {Promise}
 */
const listInputDevicesP = () => {
  return listDevicesP().then(xs => xs.filter(Utils.isKindInput), error => [])
}

/**
 * Get list of supported Media Devices constraints
 * @return {Object}
 */
const listSupportedConstraints = () => {
  if (supportsAvailableConstraints) {
    return navigator.mediaDevices.getSupportedConstraints();
  }

  return new Error('Get Supported Constraints not supported');
}

exports = module.exports = {
  supportsEnumerate,
  supportsAvailableConstraints,
  listDevices,
  listDevicesP,
  listInputDevices,
  listInputDevicesP,
  listSupportedConstraints
}