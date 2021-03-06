const R = require('./ramda_subset');
const Utils = require('./index')
const Cache = require('./cache')
const Task = require('data.task')
const Either = require('data.either')

/**
 * Temporal cache for retrieved sourceId
 * @type {String}
 */
let sourceId = ''

/**
 * Extension state holder
 * @type {String}
 */
let extensionState = ''

/**
 * Helper function
 * Verifies if an event's origin matches our app's location
 * 
 * @param  {Event} event                Event Object
 * @return {Either(String Event)}
 */
const checkEventOrigin = event => {
  return event.origin != window.location.origin ? Either.Left('Bad message origin')
                                                : Either.Right(event)
}

/**
 * Message Data handler
 * @param  {Object} data Can contain a String or an Object with the sourceId
 */
const handleMessage = data => {
  // "Cancel" button clicked by user
  if (data == 'PermissionDeniedError') {
    extensionState = 'PermissionDeniedError'
    sourceId = 'PermissionDeniedError'
    return
  }

  // Extension notified his presence
  if (data == 'custom-rtc-extension-loaded') {
    extensionState = 'ExtAvailable'
    return
  }

  // Extension shared temp sourceId
  if (data.sourceId) {
    sourceId = data.sourceId
  }
}

/**
 * Message callback composition
 * Event -> Check Origin -> Extract Data -> Handle Data
 * @type {Function}
 */
const messageCallback = R.compose(R.chain(handleMessage),
                                  R.map(R.prop('data')),
                                  checkEventOrigin)

/**
 * Setup Window listeners to handle messaging with Extension
 * @return {[type]} [description]
 */
const setupListeners = () => window.addEventListener('message', messageCallback)

/**
 * Task
 * Wraps Extension Check process
 * @return {Task} Task(Boolean Boolean)
 */
const checkExtension = new Task((rej, res) => {
  setupListeners()

  if (extensionState == 'ExtAvailable') {
    return res(true)
  }

  window.postMessage('verify-installed', '*')

  let counter = 0

  const interval = setInterval(function() {
    if (extensionState == 'ExtAvailable') {
      clearInterval(interval)
      res(true)
    } else {
      counter++
    }

    if (counter > 10) {
      clearInterval(interval)
      rej(false)
    }
  }, 500)
})

/**
 * Promise
 * Wraps Extension Check process
 * @return {Promise}
 */
const checkExtensionP = () =>
  new Promise((res, rej) => {
    setupListeners()

    if (extensionState == 'ExtAvailable') {
      return res(true)
    }

    window.postMessage('verify-installed', '*')

    let counter = 0

    const interval = setInterval(function() {
      if (extensionState == 'ExtAvailable') {
        clearInterval(interval)
        res(true)
      } else {
        counter++
      }

      if (counter > 10) {
        clearInterval(interval)
        rej(false)
      }
    }, 500)
  })

/**
 * Request SourceId call
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const getSourceId = () => window.postMessage('get-sourceId', '*')


const getScreenConstraints = new Task((rej,res) => {

  var screen_constraints = {
    mandatory: {
      chromeMediaSource: 'desktop',
      maxWidth: screen.width > 1920 ? screen.width : 1920,
      maxHeight: screen.height > 1080 ? screen.height : 1080
    },
    optional: []
  }

  if (extensionState === 'ExtAvailable') {
    sourceId = ''
    getSourceId()
    let counter = 0

    const interval = setInterval(function() {
      if (sourceId == 'PermissionDeniedError') {
        clearInterval(interval)
        rej(new Error('Screen Share permission denied by user'));
      } else if (sourceId !== '') {
        screen_constraints.mandatory.chromeMediaSourceId = sourceId
        clearInterval(interval)
        res(screen_constraints)
      } else {
        counter++
      }

      if (counter > 20) {
        clearInterval(interval)
        rej(false)
      }
    }, 500)
    return
  } else {
    rej(new Error('Screen Share extension not responding'))
  }
})


/**
 * Module exports
 * @type {Object}
 */
exports = module.exports = {
  checkExtension,
  getScreenConstraints
}
