/*!
jasmine-precondition
https://github.com/tiagorg/jasmine-precondition

Copyright (c) 2015, Tiago Garcia
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

    if (typeof condition !== 'function') {
      throw new Error('preCondition: the first parameter must be passed as the condition function');
    }
    if (typeof done !== 'function') {
      throw new Error('preCondition: the second parameter must be passed as the done callback');
    }

    verifier = function () {
      if (condition()) {
        done();
        return;
      }
      timeout();
    };
    timeout = setTimeout.bind(this, verifier, interval || 100);

    verifier();
  };
}));
