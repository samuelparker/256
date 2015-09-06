"use strict";

var Util = {};

// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/randomhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!

Util.isGreaterThanZero = function (value) { return value > 0; }

Util.isBetween = function (number, min, max) {
  return min <= number && number <= max;
};

Util.getRandom = function (limit_min, limit_) {
  var min, limit;
  if (arguments.length > 1) {
    min = limit_min;
    limit = limit_;
  } else {
    min = 0;
    limit = limit_min;
  }
  return Math.floor(Math.random() * (limit - min)) + min;
};

Util.isPowerOfTwo = function (number) {
  var match = 2;
  while (match < number) { match *= 2; }
  return match === number;
};

Util.sample = function (array) {
  var index = this.getRandom(0, array.length);
  return array[index];
};

Util.samples = function (array, count) {
  var source, destination, index, element;
  source = array.slice();
  destination = [];

  while (count--) {
    index = this.getRandom(0, source.length);
    element = source.splice(index , 1)[0];
    destination.push(element);
  }
  return destination;
};

Util.areEqualArrays = function (arrayA, arrayB) {
  var index = arrayA.length;
  if (index !== arrayB.length) { return false; }
  while (index--) {
    if (arrayA[index] !== arrayB[index]) { return false; }
  }
  return true;
};
