/**
 * Verify if the given parameter is an Object with a 'kind' key containing a String with 'input' in it
 *
 * DOC:
 * ----
 * Predicate
 * @param  {Object}  x  Object to be analyzed
 * @return {Boolean}
 */

// Import my module
const Utils = require('../../utils/index.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')

describe('Util | Predicate', function() {

  describe('Is Kind Input:: isKindInput', function() {

    it('should return true if given an Object with "kind" key containing "input" as part of a string', function() {
      const res = Utils.isKindInput({kind: 'audioinput'});
      expect(res).toExist();
    });

    it('should return false if given anything other than an Object', function() {
      const res1 = Utils.isKindInput(null);
      const res2 = Utils.isKindInput(undefined);
      const res3 = Utils.isKindInput('string');
      const res4 = Utils.isKindInput(123);
      const res5 = Utils.isKindInput(true);
      const res6 = Utils.isKindInput([]);

      expect(res1).toNotExist();
      expect(res2).toNotExist();
      expect(res3).toNotExist();
      expect(res4).toNotExist();
      expect(res5).toNotExist();
      expect(res6).toNotExist();
    });

    it('should return false is the Object given does not contain a key name "kind"', function() {
      const res = Utils.isKindInput({});
      expect(res).toNotExist();
    });

    it('should return false if the key "kind" in the Object given does not contain a String', function() {
      const res1 = Utils.isKindInput({kind: null});
      const res2 = Utils.isKindInput({kind: undefined});
      const res3 = Utils.isKindInput({kind: []});
      const res4 = Utils.isKindInput({kind: 123});
      const res5 = Utils.isKindInput({kind: true});

      expect(res1).toNotExist();
      expect(res2).toNotExist();
      expect(res3).toNotExist();
      expect(res4).toNotExist();
      expect(res5).toNotExist();
    });

    it('should return false if the key "kind" in the Object given contains a String that does not have "input" as part of it', function() {
      const res = Utils.isKindInput({kind: 'audionput'});
      expect(res).toNotExist();
    });
  })

});