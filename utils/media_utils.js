const R = require('ramda')
const Utils = require('./index')
const Cache = require('./cache')

/**
 * Get Stream with getUserMedia API
 * @param  {Object} opts getUserMedia constraints to be used
 * @return {Promise}
 */
const getStream = opts => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia(opts)
              .then(res => {
                resolve(checkNoStreamErr(res))
              }, err => {
                reject(err)
              })
  })
}

/**
 * Get User Media result check
 * Necessary due to the getUserMedia Promise resolving correctly in insecure origins.
 * @param  {Object} res Result give by getUserMedia
 * @return {Promise}
 */
const checkNoStreamErr = res => {
  const val = /Only secure origins are allowed/.test(res.message);
  if (val) {
    return Promise.reject(res)
  }
  Cache.push('streams', res);
  return Promise.resolve(res)
}

/**
 * Check if Tests Mode is requested
 * Predicate
 * 
 * @param  {Object} opts Options Objected sent by user untouched
 * @return {Boolean}
 */
const checkTestMode = opts => {
  return Utils.safeProp('testMode', opts).getOrElse(false)
}

/**
 * Get getUserMedia Test Mode options
 * @return {[type]} [description]
 */
const getTestModeOpts = () => {
  return {
    video: {
      height: 240,
      width: 320,
      frameRate: {
        ideal: 10,
        max: 15
      },
      facingMode: 'user'
    },
    audio: {
      echoCancellation: true
    }
  }
}

/**
 * Get User Media option validation helper
 * @param  {Object} opts Options to retrieve User Media
 * @return {Boolean}
 */
const validateOpts = opts => {
  if (R.isNil(opts)) {
    return new Error('At least one of audio and video must be requested')
  }
  if (opts.testMode) {
    return true
  }
  if(R.isNil(opts.video) && R.isNil(opts.audio)) {
    return new Error('At least one of audio and video must be requested')
  }
  return true
}

const getTracks = stream => stream.getTracks()

const stopTrack = track => track.stop()

/**
 * Module exports
 * @type {Object}
 */
exports = module.exports = {
  getStream,
  checkTestMode,
  getTestModeOpts,
  validateOpts,
  getTracks,
  stopTrack
}