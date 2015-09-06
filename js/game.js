// https://javascriptobfuscator.com/Javascript-Obfuscator.aspx

// jshint globalstrict:true
/* globals Util: false */

"use strict";

var POSITIONS   = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var VALUES      = [0, 2, 4, 8, 16, 32, 64, 128, 256];
var SEED_VALUES = [2, 2, 2, 4];

var LEFT_TO_RIGHT = "L";
var RIGHT_TO_LEFT = "R";
var TOP_TO_BOTTOM = "T";
var BOTTOM_TO_TOP = "B";
var SIDES         = "Left Right Top Bottom".split(" ");


function TwoFiftySixGame(valuesString_) {
  if (valuesString_) {
    this.verifyAndSet(valuesString_);
  } else {
    this.initializeValues();
  }
  this.score = 0;
  // this.getValues = function () { return values.slice(); }
  // this.setValues = function (newValues) = {
  //
  // };
}

TwoFiftySixGame.prototype.copy = function () {
  var copy = new this.constructor();
  copy.score = this.score;
  copy.values = this.values.slice();
  return copy;
};

TwoFiftySixGame.prototype.verifyAndSet = function (valuesString) {
  // var cells = cellsString.match(/\D+/);
  var words, values, index, zeroes, value;

  function asNumber(word) { return parseInt(word); }

  words = valuesString.match(/\d+/g);
  if (words.length !== 16) {
    throw new Error("String must contain 16 numbers!");
  }

  values = words.map(asNumber);
  index = 0;
  zeroes = 0;

  while (index < 16) {
    value = values[index++];
    if (value) {
      if (!Util.isPowerOfTwo(value)) {
        throw new Error("Non-zero numbers must be powers of 2!");
      }
    } else {
      if (++zeroes > 14) {
        throw new Error("Must contain at least 2 non-zero numbers!");
      }
    }
  }
  this.values = values;
  return this;
};


TwoFiftySixGame.prototype.initializeValues = function () {
  this.values = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  this.addNewValues(2);
};

TwoFiftySixGame.prototype.emptyPositions = function () {
  var positions = [];
  this.values.forEach(function (value, index) {
    if (value === 0) { positions.push(index); }
  });
  return positions;
};

TwoFiftySixGame.prototype.filledPositions = function () {
  var positions = [];
  this.values.forEach(function (value, index) {
    if (value > 0) { positions.push(index); }
  });
  return positions;
};

TwoFiftySixGame.prototype.addNewValues = function (count) {
  var emptyPositions = this.emptyPositions();
  var newPositions = Util.samples(emptyPositions, count);
  var newValues = Util.samples(SEED_VALUES, count);
  var index = 0;
  do {
    this.values[newPositions[index]] = newValues[index];
  } while (++index < count);
  return this;
};

TwoFiftySixGame.prototype.toString = function () {
  var word, words, sliceIndex;
  words = [];
  sliceIndex = 0;
  while (sliceIndex < 4) {
    word = this.getSlice(sliceIndex++).join(" ");
    words.push(word);
  }
  return words.join("   ");
};

TwoFiftySixGame.prototype.forSlice = function (sliceIndex, direction, action) {
  var values = this.values;
  var position, increment, count, value;

  switch (direction[0].toUpperCase()) {
    case LEFT_TO_RIGHT : position =  sliceIndex * 4    ; increment =  1; break;
    case RIGHT_TO_LEFT : position =  sliceIndex * 4 + 3; increment = -1; break;
    case TOP_TO_BOTTOM : position =  sliceIndex        ; increment =  4; break;
    case BOTTOM_TO_TOP : position =  sliceIndex + 12   ; increment = -4; break;
  }
  count = 4;
  while (count--) {
    value = values[position];
    action.call(this, value, position);
    position += increment;
  }
  return this;
};


TwoFiftySixGame.prototype.getSlice = function (sliceIndex, direction_) {
  var values = this.values;
  var direction = direction_ || "LEFT_TO_RIGHT";
  var slice, index, increment, count, value;

  slice = [];
  this.forSlice(sliceIndex, direction, function (value) {
    slice.push(value);
  });
  return slice;
};

TwoFiftySixGame.prototype.putSlice = function (sliceIndex, direction, slice) {
  var values = this.values;
  var index = 0;

  this.forSlice(sliceIndex, direction, function (_value, position) {
    values[position] = slice[index++];
  });
  return this;
};


TwoFiftySixGame.prototype.smashValues = function (slice) {
  var sourceValues = slice.filter(Util.isGreaterThanZero);
  var smashedValues = [0, 0, 0, 0];
  var currentValue, nextValue, fromIndex, toIndex;

  fromIndex = toIndex = 0;

  currentValue = sourceValues[fromIndex++];

  while (currentValue) {
    nextValue = sourceValues[fromIndex++];

    if (!nextValue) {
      smashedValues[toIndex] = currentValue;
      break;
    }

    if (currentValue === nextValue) {
      this.score += (smashedValues[toIndex++] = currentValue + nextValue);
      currentValue = sourceValues[fromIndex++];
    } else {
      smashedValues[toIndex++] = currentValue;
      currentValue = nextValue;
    }
  }
  return smashedValues;
};


TwoFiftySixGame.prototype.smash = function (toSide) {
  var index, isChanged, direction, values, smashedValues;
  index = 4;
  isChanged = false;
  direction = toSide;

  while (index--) {
    values = this.getSlice(index, direction);
    smashedValues = this.smashValues(values);
    if (!Util.areEqualArrays(values, smashedValues)) {
      this.putSlice(index, direction, smashedValues);
      isChanged = true;
    }
  }
  return isChanged;
};

TwoFiftySixGame.prototype.move = function (toSide) {
  return this.smash(toSide) ? this.addNewValues(1) : this;
};

TwoFiftySixGame.prototype.isDone = function () {
  var index = SIDES.length;

  if (!this.values.every(Util.isGreaterThanZero)) { return false; }
	while (index--) {
    if (this.copy().smash(SIDES[index])) { return false; }
  }
  return true;
};
