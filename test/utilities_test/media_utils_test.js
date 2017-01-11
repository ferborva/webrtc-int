/**
 * Media generic utility tests are found here
 *
 * :Index:
 * -------
 *
 */

// Import my module
const Utils = require('../../utils/media_utils.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')

describe('Util | Media', function() {

  describe('Test Mode check:: checkTestMode', function() {

    it('should return true if options object has testMode')

    it('should return false if options object does not have testMode')

  })

  describe('Constraints validation:: validateOpts', function() {

    it('should return an error if no constraints are given')

    it('should return an error if the constraints given do not contain one of video and audio')

    it('should return true if the constraints given contains testMode key')

    it('should return true if the constraints given has one of video and audio')

  })

});
