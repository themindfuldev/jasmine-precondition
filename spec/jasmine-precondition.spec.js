'use strict';

var preCondition = require('../lib/jasmine-precondition');

describe('the preCondition instruction', function () {

  it('should be loaded', function(){
    expect(typeof preCondition === 'function').toBeTruthy();
  });

  describe('initialization', function() {

    it('should get executed when no interval is passed', function (done) {
      preCondition(function(){
        return true;
      }, done);
    });

    it('should fail when no condition is passed', function (done) {
      try {
        preCondition();
      }
      catch (e) {
        expect(e.message).toBe('preCondition: the first parameter must be passed as the condition function');
        done();
      }
    });

    it('should fail when no done is passed', function (done) {
      try {
        preCondition(jasmine.createSpy('fake'));
      }
      catch (e) {
        expect(e.message).toBe('preCondition: the second parameter must be passed as the done callback');
        done();
      }
    });
  });

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
