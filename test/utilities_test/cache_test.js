/**
 * Set/Get values obtaining utility funcitons
 *
 * Index:
 * ------
 *
 * - set
 * - replace
 * - get
 * - getAll
 * - clear
 */

// Import my module
const Cache = require('../../utils/cache.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')
const Either = require('data.either')


describe('Util | Cache', function() {

  beforeEach(Cache.clear)

  describe('Set/Get Cache value:: set & get', function() {

    it('should save and retrieve any value type', function() {
      const val1 = 123;
      const val2 = 'string';
      const val3 = [1,2,3];
      const val4 = {obj: 'test-obj'};
      const val5 = false;
      const val6 = Either.of('eithered-value');

      Cache.set('val1', val1);
      Cache.set('val2', val2);
      Cache.set('val3', val3);
      Cache.set('val4', val4);
      Cache.set('val5', val5);
      Cache.set('val6', val6);

      expect(Cache.get('val1')).toEqual(Either.of(val1));
      expect(Cache.get('val2')).toEqual(Either.of(val2));
      expect(Cache.get('val3')).toEqual(Either.of(val3));
      expect(Cache.get('val4')).toEqual(Either.of(val4));
      expect(Cache.get('val5')).toEqual(Either.of(val5));
      expect(Cache.get('val6')).toEqual(Either.of(val6));
    })

  })

  describe('Get entire cache:: getAll', function() {

    it('should retrieve the entire cache object', function() {
      Cache.set('val1', 123)
      Cache.set('val2', 'string')

      expect(Cache.getAll()).toEqual({val1: 123, val2: 'string'})
    })

  })

  describe('Replace entire cache:: replace', function() {

    it('should replace the complete cache object with the given one', function() {
      Cache.set('val1', 123)
      Cache.set('val2', 'string')

      expect(Cache.getAll()).toEqual({val1: 123, val2: 'string'})

      Cache.replace({val3: 'new-values'})

      expect(Cache.getAll()).toEqual({val3: 'new-values'})
    })

  })

  describe('Clear entire cache:: clear', function() {

    it('should clear the complete cache object', function() {
      Cache.set('val1', 123)
      Cache.set('val2', 'string')

      expect(Cache.getAll()).toEqual({val1: 123, val2: 'string'})

      Cache.clear()

      expect(Cache.getAll()).toEqual({})
    })

  })

  describe('Push items into key:: push', function() {

    it('should create a new array with the passed in values if the key is empty', function() {
      const testVal1 = Cache.get('testVal1')
      expect(testVal1.isLeft).toExist()

      Cache.push('testVal1', 1)
      expect(Cache.get('testVal1')).toEqual(Either.of([1]))

      const testVal2 = Cache.get('testVal2')
      expect(testVal2.isLeft).toExist()

      Cache.push('testVal2', [1,2,3])
      expect(Cache.get('testVal2')).toEqual(Either.of([1,2,3]))
    })

    it('should concat the values to the existing key', function() {
      Cache.push('testVal', 1)
      expect(Cache.get('testVal')).toEqual(Either.of([1]))

      Cache.push('testVal', [2,3,4])
      expect(Cache.get('testVal')).toEqual(Either.of([1,2,3,4]))

      Cache.push('testVal', 5)
      expect(Cache.get('testVal')).toEqual(Either.of([1,2,3,4,5]))
    })

  })

})