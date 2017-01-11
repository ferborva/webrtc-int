const R = require('ramda');
const Utils = require('./utils/index');
const Media = require('./utils/media_utils');
const Cache = require('./utils/cache');
const Support = require('./utils/support');
const Task = require('data.task');

/**
 * Task - Safe Enumerate Devices Wrapper
 * @return {Task}
 */
const listDevices = new Task((rej, res) => {
  if (Support.enumerate) {
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
    if (Support.enumerate) {
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
  if (Support.availableConstraints) {
    return navigator.mediaDevices.getSupportedConstraints();
  }

  return new Error('Get Supported Constraints not supported');
}

/**
 * Get User Media control wrapper
 * 
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
const getMedia = (opts = {}) => {
  if (Support.userMedia) {
    const validation = Media.validateOpts(opts);
    opts = Media.checkTestMode(opts) ? Media.getTestModeOpts() : opts
    return validation instanceof Error ? Promise.reject(validation)
                                       : Media.getStream(opts)
  }

  return Promise.reject(new Error('Get User Media not supported'));
}

/**
 * Stop all active stream tracks
 * @return {[type]} [description]
 */
const stopAllTracks = () => {
  Cache.get('streams')
       .map(R.map(Media.getTracks))
       .map(R.flatten)
       .map(R.map(Media.stopTrack))
}

exports = module.exports = {
  listDevices,
  listDevicesP,
  listInputDevices,
  listInputDevicesP,
  listSupportedConstraints,
  getMedia,
  stopAllTracks
}