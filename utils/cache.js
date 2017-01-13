const R = require('./ramda_subset');
const Either = require('data.either');

/**
 * Local Cache Object
 * @type {Object}
 */
let cache = {}

/**
 * Save value/object to cache key
 * Curried
 * @param  {String} key   Key where the object will be located
 * @param  {Object} xs    Value to be saved
 * @return {Object}       Value to be saved returned untouched
 */
const set = R.curry((key, xs) => {
  cache[key] = xs;
  return xs;
})

/**
 * Push values to a cached array
 * Curried
 * @param  {String} key   Key where the values will be pushed
 * @param  {Array} xs    Values to be pushed
 * @return {Object}       Value to be saved returned untouched
 */
const push = R.curry((key, xs) => {
  const curr = cache[key]
  if (curr) {
    cache[key] = cache[key].concat(xs)
  } else {
    cache[key] = [].concat(xs)
  }
  return cache[key];
})

/**
 * Replace the whole cache with a new object
 * @param  {Object} obj New cache value
 * @return {Object}     New cache value untouched
 */
const replace = obj => {
  cache = obj
  return obj;
}

/**
 * Get value/object from cache key
 * @param  {String} key   Key where the value/object will be looked for
 * @return {Maybe}
 */
const get = key => Either.fromNullable(cache[key])


/**
 * Get complete cache object
 * @return {object} Complete cache object
 */
const getAll = () => cache

/**
 * Clear the cache
 * @return {Object} Empty cache
 */
const clear = () => {
  cache = {}
  return cache;
}

/**
 * Module exporting
 */
exports = module.exports = {
  set,
  push,
  replace,
  get,
  getAll,
  clear
}