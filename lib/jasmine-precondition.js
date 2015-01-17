/*!
    jasmine-precondition

    (c) 2015 Tiago Garcia
    This may be freely distributed under the MIT license.
*/

'use strict';

var preCondition = module.exports = function(condition, done, interval) {

  var verifier, timeout;

  if (condition && done) {
    interval = interval || 100;

    verifier = function() {
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
