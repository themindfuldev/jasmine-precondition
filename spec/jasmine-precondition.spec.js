'use strict';

var preCondition = require('../lib/jasmine-precondition');

describe('the preCondition command', function () {

  describe('working with counters', function() {

    var counter1 = 0,
        counter2 = 0,
        interval;

    beforeEach(function(done) {
      interval = setInterval(function(){
        counter1 += 100;
      }, 100);

      preCondition(function() {
        return counter1 >= 500;
      }, done, 100);
    });

    it('should only get executed when counter1 is 500', function (done) {
      expect(counter1).toBe(500);

      preCondition(function() {
        counter2 += 200;
        return counter2 === 1000;
      }, done, 100);
    });

    it('should only get executed when counter2 is 1000', function () {
      expect(counter2).toBe(1000);
    });

    afterEach(function(){
      clearInterval(interval);
    });

  });

});
