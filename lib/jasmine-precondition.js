/*!
jasmine-precondition
https://github.com/tiagorg/jasmine-precondition

Copyright (c) 2015, Tiago Garcia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
    else {
      if (typeof condition !== 'function') {
        throw new Error('preCondition: the first parameter must be passed as the condition function');
      }
      if (typeof done !== 'function') {
        throw new Error('preCondition: the second parameter must be passed as the done callback');
      }
    }
  };
}));
