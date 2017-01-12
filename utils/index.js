const R = require('ramda');
const Either = require('data.either');


/**
 * Trace Utility function
 * Used to see state changes throughout function composition
 * @param  {String} tag Descriptive string tag of the state
 * @param  {Object} x   Value found in the transition
 * @return {Object}     Value found in the transition returned intact
 */
const trace = R.curry((tag, x) => {
  console.log(tag, x)
  return x
})

/**
 * Safely request access to an object's property
 * Curried
 * 
 * @param  {String} target  Key target name
 * @param  {Object} object  Object in which the data will be searched
 * @return {Either}         Either(string value)
 */
const safeProp = R.curry((target, object) => {
  // Check for null or undefined values
  if (R.isNil(object)) {
    return Either.Left(`Error:: received null or undefined as target`)
  }
  const value = R.prop(target, object);
  return value ? Either.Right(value)
               : Either.Left(`Error:: Could not find ${target}`);
});

/**
 * isFunction verification
 * Predicate
 * 
 * @param  {Object} x [description]
 * @return {Boolean}
 */
const isFunction = x => R.is(Object, x) && x instanceof Function

/**
 * Verifies the object passed has a 'kind' key which contains a String with the word 'input' in it
 * Predicate
 * 
 * @param  {Object}  x  Object to be analyzed
 * @return {Boolean}
 */
const isKindInput = x => {
  const kind = safeProp('kind', x)
  const result = kind.fold(e => false, r => regIsInput(r))
  return result
}

// RegEx Testers

/**
 * Tests 'input' is found in the passed string
 * Predicate
 * 
 * @type {Boolean}
 */
const regIsInput = R.test(/input/ig)

/**
 * Module exporting
 */
exports = module.exports = {
  trace,
  safeProp,
  isKindInput,
  isFunction
}