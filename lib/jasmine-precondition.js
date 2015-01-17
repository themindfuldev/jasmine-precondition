/*!
jasmine-precondition

A Jasmine instruction to ease setting up asynchronous pre-conditions before tests.

https://github.com/tiagorg/jasmine-precondition

Usage:

preCondition(condition, done, interval)

* condition: a function that shall only return true when the condition you are expecting for is met
* done: the done callback from beforeEach, it or afterEach must be passed here.
* interval (optional): a time interval between two condition verifications. Default is 100.

(c) 2015 Tiago Garcia
This may be freely distributed under the MIT license.
*/

'use strict';

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.preCondition = factory();
  }
}(this, function () {
  return function (condition, done, interval) {
    var verifier, timeout;

    if (typeof condition === 'function' && typeof done === 'function') {
      interval = interval || 100;

      verifier = function () {
        if (condition()) {
          done();
          return;
        }
        timeout();
      };
      timeout = setTimeout.bind(this, verifier, interval);

      verifier();
    }
  };
}));
