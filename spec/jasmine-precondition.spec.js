'use strict';

var preCondition = require('../lib/jasmine-precondition');

describe('the preCondition lib', function () {

  describe('working with counters', function() {

    var counter = 0;

    beforeEach(function(done) {
      preCondition(function() {
        counter += 100;
        return counter === 500;
      }, done, 100);
    });

    it('should get executed only when counter is 500', function () {
      expect(counter).toBe(500);
    });

  });

});
