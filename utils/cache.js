const R = require('ramda');
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
  replace,
  get,
  getAll,
  clear
}