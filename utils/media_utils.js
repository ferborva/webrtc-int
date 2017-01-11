const R = require('ramda')
const Utils = require('./index')

const getStream = opts => {
  return navigator.mediaDevices.getUserMedia(opts)
    .then(R.identity, R.identity)
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

/**
 * Module exports
 * @type {Object}
 */
exports = module.exports = {
  getStream,
  checkTestMode,
  getTestModeOpts,
  validateOpts
}