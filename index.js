const R = require('./utils/ramda_subset');
const Utils = require('./utils/index')
const Media = require('./utils/media_utils')
const Cache = require('./utils/cache')
const Support = require('./utils/support')
const ScreenShare = require('./utils/screen_share')
const Task = require('data.task')

/**
 * Task - Safe Enumerate Devices Wrapper
 * @return {Task}
 */
const listDevices = new Task((rej, res) => {
  getMedia({video: true, audio: true}).then(r => {
      // Stop media tracks
    const tracks = r.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    // Enumerate
    if (Support.enumerate) {
      navigator.mediaDevices.enumerateDevices().then(r => {
        res(r)
      }, e => {
        rej(e)
      })
    } else {
      rej(new Error('Enumerate devices not supported'))
    }
  }, e => {
    rej(e)
  })
})

/**
 * Promise - Safe Enumerate Devices Wrapper
 * @return {Promise}
 */
const listDevicesP = () => {
  return new Promise((res, rej) => {
    // Get permissions
    getMedia({video: true, audio: true}).then(r => {
      // Stop media tracks
      const tracks = r.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      // Enumerate
      if (Support.enumerate) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
          res(devices)
        }, err => {
          rej(err)
        })
      } else {
        rej(new Error('Enumerate devices not supported'))
      }
    }, e => {
      rej(e)
    })
  })
}

/**
 * Task - Filtered list of Devices
 * Only Input Devices (Audio & Video)
 * @return {Task}
 */
const listInputDevices = listDevices.map(R.filter(Utils.isKindInput))

/**
 * Promise - Filtered list of Devices
 * Only Input Devices (Audio & Video)
 * @return {Promise}
 */
const listInputDevicesP = () => listDevicesP().then(xs => xs.filter(Utils.isKindInput), error => [])

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
 * Promise Get Screen/App/Tab stream
 * @return {Promise}
 */
const getScreen = new Task((rej, res) => {
  checkExtension
    .fork(err => {
            rej(new Error('Screen Share extension is not installed or disabled'))
          }, r => {
            ScreenShare.getScreenConstraints
             .map(constraints => ({video: constraints}))
             .map(getMedia)
             .fork(rej, r => {
                          r.then(res, rej)
                        })
          })
})

/**
 * Promise Get Screen/App/Tab stream
 * @return {Promise}
 */
const getScreenP = () => {
  return new Promise((res, rej) => {
    checkExtension
    .fork(err => {
            rej(new Error('Screen Share extension is not installed or disabled'))
          }, r => {
            ScreenShare.getScreenConstraints
             .map(constraints => ({video: constraints}))
             .map(getMedia)
             .fork(rej, r => {
                          r.then(res, rej)
                        })
          })
  })
}

/**
 * Get User Media control wrapper
 * 
 * @param  {Object} opts GetUserMedia constraints
 * @return {Promise}
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
 * @return {Either} Either cotaining error or array with all stopped tracks
 */
const stopAllTracks = () =>
  Cache.get('streams')
       .map(R.map(Media.getTracks))
       .map(R.flatten)
       .map(R.map(Media.stopTrack))

/**
 * Task - Check if ScreenShare extension is installed
 * Predicate
 * 
 * @return {Task} Task(Boolean Boolean)
 */
const checkExtension = ScreenShare.checkExtension

/**
 * Promise - Check if ScreenShare extension is installed
 * Predicate
 * 
 * @return {Promise}
 */
const checkExtensionP = ScreenShare.checkExtensionP


exports = module.exports = {
  listDevices,
  listDevicesP,
  listInputDevices,
  listInputDevicesP,
  listSupportedConstraints,
  checkExtension,
  checkExtensionP,
  getScreen,
  getScreenP,
  getMedia,
  setTestConstraints: Media.setTestModeOpts,
  stopAllTracks
}