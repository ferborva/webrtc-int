/**
 * Media generic utility tests are found here
 *
 * :Index:
 * -------
 *
 * - checkTestMode
 * - validateOpts
 */

// Import my module
const Media = require('../../utils/media_utils.js')

// Import testing utils
const expect = require('expect')
const R = require ('ramda')

describe('Util | Media', function() {

  describe('Test Mode check:: checkTestMode', function() {

    it('should return true if options object has testMode', function() {
      expect(Media.checkTestMode({testMode:true})).toExist()
      expect(Media.checkTestMode({testMode:false})).toNotExist()
    })

    it('should return false if options object does not have testMode', function() {
      expect(Media.checkTestMode()).toNotExist()
      expect(Media.checkTestMode(null)).toNotExist()
      expect(Media.checkTestMode(undefined)).toNotExist()
      expect(Media.checkTestMode(123)).toNotExist()
      expect(Media.checkTestMode('string')).toNotExist()
      expect(Media.checkTestMode([])).toNotExist()
      expect(Media.checkTestMode({})).toNotExist()
      expect(Media.checkTestMode(false)).toNotExist()
      expect(Media.checkTestMode(Error)).toNotExist()
    })

  })

  describe('Constraints validation:: validateOpts', function() {

    it('should return an error if no constraints are given', function() {
      const result = Media.validateOpts()
      expect(result instanceof Error).toExist()
    })

    it('should return an error if the constraints given do not contain one of video and audio', function() {
      const result = Media.validateOpts({noAudioOrVideo: true})
      expect(result instanceof Error).toExist()
    })

    it('should return true if the constraints given contains testMode key', function() {
      expect(Media.validateOpts({testMode: true})).toExist()
    })

    it('should return true if the constraints given has one of video and audio', function() {
      expect(Media.validateOpts({audio: true})).toExist()
      expect(Media.validateOpts({video: true})).toExist()
      expect(Media.validateOpts({video: true, audio: true})).toExist()
      expect(Media.validateOpts({video: {}, audio: {}})).toExist()
    })

  })

})
