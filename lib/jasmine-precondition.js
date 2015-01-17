/*!
    jasmine-precondition

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

    if (condition && done) {
      interval = interval || 100;

      verifier = function () {
        if (condition()) {
          done();
          return;
        }
        timeout();
      };
      timeout = setTimeout.bind(this, verifier, interval);

      timeout();
    }
  };
}));
