const R = require('./ramda_subset');
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
              .then(result => {
                resolve(checkNoStreamErr(result))
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
const checkNoStreamErr = result => {
  const val = /Only secure origins are allowed/.test(result.message);
  if (val) {
    return Promise.reject(result)
  }
  Cache.push('streams', result)
  return Promise.resolve(result)
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
 * Default Test Mode constraints
 * @type {Object}
 */
let testModeOpts = {
  video: {
    height: 120,
    width: 160,
    frameRate: {
      ideal: 5,
      max: 10
    },
    facingMode: 'user'
  },
  audio: {
    echoCancellation: true,
    volume: 1
  }
}

/**
 * Get getUserMedia Test Mode options
 * @return {[type]} [description]
 */
const getTestModeOpts = () => {
  return testModeOpts
}

/**
 * Set getUserMedia Test Mode options
 * @param  {Object} o  New test mode constraints
 * @return {Object}    Received constraints untouched
 */
const setTestModeOpts = o => {
  testModeOpts = o
  return o
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
 * Get tracks available in a Media Stream object
 * @param  {MediaStream} stream  MediaStream instance
 * @return {Array}               Contains the tracks found
 */
const getTracks = stream => stream.getTracks()

/**
 * Stop Media Track
 * @param  {MediaTrack} track
 * @return {MediaTrack}
 */
const stopTrack = track => track.stop()

/**
 * Module exports
 * @type {Object}
 */
exports = module.exports = {
  getStream,
  checkTestMode,
  getTestModeOpts,
  setTestModeOpts,
  validateOpts,
  getTracks,
  stopTrack
}