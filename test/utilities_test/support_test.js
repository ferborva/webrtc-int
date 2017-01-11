/**
 * Test suite for support check for Device Enumeration
 *
 * Predicate
 * Checks for the existence of navigator.mediaDevices.enumerateDevices
 * &
 * Checks its a function
 */

// Import module to be tested
const Support = require('../../utils/support')
const Utils = require('../../utils')

// Import testing utilities
const R = require('ramda')
const expect = require('expect')


describe('Support | Predicates', function() {

  describe('Supports Device Enumeration:: enumerate', function() {

    it('should return true if navigator.mediaDevices.enumerateDevices exists & is a Function', function() {
      let window = {};
      window.navigator = {
        mediaDevices: {
          enumerateDevices: function(){
            return true
          }
        }
      }
      const result = Support.enumerate(window);
      expect(result).toExist();
    });

    it('should return false if navigator.mediaDevices.enumerateDevices does not exists', function() {
      let window = {};
      window.navigator = {}
      const result = Support.enumerate(window);
      expect(result).toNotExist();
    })

  });

  describe('Supports Get Supported Constraints:: availableConstraints', function() {

    it('should return true if navigator.mediaDevices.getSupportedConstraints exists & is a Function', function() {
      let window = {};
      window.navigator = {
        mediaDevices: {
          getSupportedConstraints: function(){
            return true
          }
        }
      }
      const result = Support.availableConstraints(window);
      expect(result).toExist();
    });

    it('should return false if navigator.mediaDevices.getSupportedConstraints does not exists', function() {
      let window = {};
      window.navigator = {}
      const result = Support.availableConstraints(window);
      expect(result).toNotExist();
    })

  });

  describe('Supports Get User Media:: userMedia', function() {

    it('should return true if navigator.mediaDevices.getUserMedia exists & is a Function', function() {
      let window = {};
      window.navigator = {
        mediaDevices: {
          getUserMedia: function(){
            return true
          }
        }
      }
      const result = Support.userMedia(window);
      expect(result).toExist();
    });

    it('should return false if navigator.mediaDevices.getUserMedia does not exists', function() {
      let window = {};
      window.navigator = {}
      const result = Support.userMedia(window);
      expect(result).toNotExist();
    })

  });

});