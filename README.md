# jasmine-precondition [![Build Status](https://travis-ci.org/tiagorg/jasmine-precondition.svg?branch=master)](https://travis-ci.org/tiagorg/jasmine-precondition)

A Jasmine instruction to ease setting up asynchronous pre-conditions before tests.

## Why?

Since Jasmine 2.0, the ```runs```, ```waits```, and ```waitsFor``` methods have been removed in favor of allowing functions run as part of the spec to receive and invoke a ```done``` callback. This new approach is described at [Upgrading Jasmine - Asynchronous Specs](http://jasmine.github.io/2.1/upgrading.html#section-Asynchronous_Specs).

The ```done``` callback works great for asynchronous features with a callback (such as AJAX, jQuery animations or anything else with promises). However, there are yet other asynchronous features that will complete on their own, like rendering Google Maps (natively), images or anything else that can change both the DOM and the CSSOM.

While it is utterly possible to [re-implement ```waitsFor```](https://gist.github.com/abreckner/110e28897d42126a3bb9) I believe that Jasmine 2.0 direction is more towards stepping away from this idea and instead take more advantage of ```done``` callbacks, for instance also using it inside ```it``` blocks.

Thus, the ```preCondition``` instruction defined here will simply poll a given function at a certain time interval, and once this condition is resolved, the callback ```done``` will be fired off.

## Usage

```
preCondition(condition, done, interval)
```

where:

* ```condition```: a function that shall only return ```true``` when the condition you are expecting for is met
* ```done```: the ```done``` callback from ```beforeEach```, ```it``` or ```afterEach``` must be passed here.
* ```interval``` (optional): a time interval between two ```condition``` verifications. Default is 100.

## Example

```javascript
describe('the preCondition command', function () {

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
```
