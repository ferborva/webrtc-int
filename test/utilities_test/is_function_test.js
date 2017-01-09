/**
 * Verify if the given parameter is a Function instace
 *
 * DOC:
 * ----
 * Predicate
 * @param  {Object} x [description]
 * @return {Boolean}
 */

// Import my module
const Utils = require('../../utils.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')

describe('Util | Function', function() {

  describe('Is Function:: isFunction', function() {

    it('should return true if give a Function', function() {
      const res = Utils.isFunction(R.identity);
      expect(res).toExist();
    });

    it('should return false if given anything other than a Function', function() {
      const res1 = Utils.isFunction(null);
      const res2 = Utils.isFunction(undefined);
      const res3 = Utils.isFunction('string');
      const res4 = Utils.isFunction(123);
      const res5 = Utils.isFunction({});
      const res6 = Utils.isFunction([]);
      const res7 = Utils.isFunction(true);

      expect(res1).toNotExist();
      expect(res2).toNotExist();
      expect(res3).toNotExist();
      expect(res4).toNotExist();
      expect(res5).toNotExist();
      expect(res6).toNotExist();
      expect(res7).toNotExist();
    });

  })

});