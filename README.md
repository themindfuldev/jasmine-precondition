# jasmine-precondition [![Build Status](https://travis-ci.org/tiagorg/jasmine-precondition.svg?branch=master)](https://travis-ci.org/tiagorg/jasmine-precondition) [![Coverage Status](https://coveralls.io/repos/tiagorg/jasmine-precondition/badge.svg?branch=master)](https://coveralls.io/r/tiagorg/jasmine-precondition?branch=master)

A Jasmine instruction to ease setting up asynchronous pre-conditions before, during and after tests

## Why?

Since Jasmine 2.0, the ```runs```, ```waits```, and ```waitsFor``` methods have been removed in favor of allowing functions run as part of the spec to receive and invoke a ```done``` callback. This new approach is described at [Upgrading Jasmine - Asynchronous Specs](http://jasmine.github.io/2.1/upgrading.html#section-Asynchronous_Specs).

The ```done``` callback works great for asynchronous features with a callback (such as AJAX, jQuery animations or anything else with promises). However, there are yet other asynchronous features that will complete on their own and would be using ```waitsFor``` before Jasmine 2.0, like rendering Google Maps, images or anything else that can change both the DOM and the CSSOM.

While it is utterly possible to [re-implement ```waitsFor```](https://gist.github.com/abreckner/110e28897d42126a3bb9) I believe that Jasmine 2.0 direction is more towards stepping away from this idea and instead taking more advantage of ```done``` callbacks, like putting one ```it``` block as a pre-condition for another.

Thus, the ```preCondition``` instruction defined here will simply poll a given conditional function at a certain time interval, and once its condition is met the callback ```done``` will be fired off.

## Installation

* Browser-version: 
  - [jasmine-precondition.js](https://raw.githubusercontent.com/tiagorg/jasmine-precondition/master/lib/jasmine-precondition.js)
  - [jasmine-precondition.min.js](https://raw.githubusercontent.com/tiagorg/jasmine-precondition/master/lib/jasmine-precondition.min.js)
* Node.js: 
  - ```npm install jasmine-precondition``` 

## Usage

```
preCondition(condition, done, interval);
```

where:

* ```condition```: a conditional function that shall only return ```true``` when the condition you are expecting for is met.
* ```done```: the ```done``` callback from ```beforeEach```, ```it``` or ```afterEach``` must be passed here.
* ```interval``` (optional): a time interval in milliseconds between two ```condition``` executions. Default is 100.

## Example

```javascript
describe('the preCondition instruction', function () {

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
```
