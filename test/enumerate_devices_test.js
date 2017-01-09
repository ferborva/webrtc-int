/**
 * Test suite for support check for Device Enumeration
 *
 * Predicate
 * Checks for the existence of navigator.mediaDevices.enumerateDevices
 * &
 * Checks its a function
 */

// Import module to be tested
const MyMod = require('../index')
const Utils = require('../utils')

// Import testing utilities
const R = require('ramda')
const expect = require('expect')


describe('Main | Predicate', function() {

  describe('Supports Device Enumeration:: supportsEnumerate', function() {

    it('should return true if navigator.mediaDevices.enumerateDevices exists & is a Function', function() {
      let window = {};
      window.navigator = {
        mediaDevices: {
          enumerateDevices: function(){
            return true
          }
        }
      }
      const result = MyMod.supportsEnumerate(window);
      expect(result).toExist();
    });

    it('should return false if navigator.mediaDevices.enumerateDevices does not exists', function() {
      let window = {};
      window.navigator = {}
      const result = MyMod.supportsEnumerate(window);
      expect(result).toNotExist();
    })

  });

});