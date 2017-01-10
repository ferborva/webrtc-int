/**
 * Safe Property obtaining utility funciton
 *
 * DOC:
 * ----
 * Curried
 * 
 * @param  {String} target  Key target name
 * @param  {Object} object  Object in which the data will be searched
 * @return {Either}         Either(string value)
 */

// Import my module
const Utils = require('../../utils/index.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')
const Either = require('data.either')

describe('Util | Function', function() {

  describe('Safe Property:: safeProp', function() {

    it('should return an instance of Either', function() {
      const result = Utils.safeProp('foo', {});
      expect(result instanceof Either).toExist('Value return should be an instance of Either');
    });

    it('should return a Right if the property exists', function() {
      const result = Utils.safeProp('foo', {foo: 'bar'});
      expect(result.isRight).toExist('Value should exist in the object given');
      expect(result.isLeft).toNotExist();
    });

    it('should return a Left if the property does not exist', function(){
      const res1 = Utils.safeProp('foo', 'stringInput');  // String input
      const res2 = Utils.safeProp('foo', 12501);          // Number input
      const res3 = Utils.safeProp('foo', new Function()); // Function input
      const res4 = Utils.safeProp('foo', {});             // Object input
      const res5 = Utils.safeProp('foo', []);             // Array input
      const res6 = Utils.safeProp('foo', false);          // Boolean input
      const res7 = Utils.safeProp('foo', null);           // Null input
      const res8 = Utils.safeProp('foo', undefined);      // Undefined input

      expect(res1.isLeft).toExist('Given a string input return Left');
      expect(res2.isLeft).toExist('Given a number input return Left');
      expect(res3.isLeft).toExist('Given a function input return Left');
      expect(res4.isLeft).toExist('Given a empty object input return Left');
      expect(res5.isLeft).toExist('Given a array input return Left');
      expect(res6.isLeft).toExist('Given a boolean input return Left');
      expect(res7.isLeft).toExist('Given a null input return Left');
      expect(res8.isLeft).toExist('Given a undefined input return Left');
    });

    it('should be curried', function() {
      const getNameSafe = Utils.safeProp('name');

      const either1 = getNameSafe({name: 'John'});
      const res1 = either1.fold(R.identity, R.identity);
      expect(res1).toEqual('John', 'Property should be found in the object given');

      const either2 = getNameSafe({noName: null});
      const res2 = either2.fold(R.identity, R.identity);
      expect(res2).toEqual('Error:: Could not find name', 'Property should not be found in the object given')
    });

    it('should be possible to map through an object', function() {
      const getNestedSafe = R.composeK(Utils.safeProp('name'),
                                      Utils.safeProp('street'),
                                      Utils.safeProp('address'));


      const either1 = getNestedSafe({ address: { street: { name: 'test-street' } } })
      const res1 = either1.fold(R.identity, R.identity);
      expect(res1).toEqual('test-street');

      const either2 = getNestedSafe({ address: { no_street: { name: 'test-street' } } })
      const res2 = either2.fold(R.identity, R.identity);
      expect(res2).toEqual('Error:: Could not find street');
    });

  });

});
