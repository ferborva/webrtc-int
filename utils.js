const R = require('ramda');
const Either = require('data.either');

/**
 * isBrowser - Browser environment detection
 * Predicate
 * @return {Boolean}
 */
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

/**
 * isNode - Node.js environment detection
 * Predicate
 * @return {Boolean}
 */
const isNode = new Function("try {return this===global;}catch(e){return false;}");

/**
 * Trace Utility function
 * Used to see state changes throughout function composition
 * @param  {String} tag Descriptive string tag of the state
 * @param  {Object} x   Value found in the transition
 * @return {Object}     Value found in the transition returned intact
 */
const trace = (tag, x) => {
  console.log(tag, x)
  return x
}

/**
 * Safely request access to an object's property
 * Curried
 * 
 * @param  {String} target  Key target name
 * @param  {Object} object  Object in which the data will be searched
 * @return {Either}         Either(string value)
 */
const safeProp = R.curry((target, object) => {
  const value = R.prop(target, object);
  return value ? Either.Right(value)
               : Either.Left(`Error:: Could not find ${target}`);
});

/**
 * isFunction verification
 * Predicate
 * @param  {Object} x [description]
 * @return {Boolean}
 */
const isFunction = x => R.is(Object, x) && x instanceof Function

/**
 * Module exporting
 */
exports = module.exports = {
  trace,
  safeProp,
  isFunction
}