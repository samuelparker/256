// https://javascriptobfuscator.com/Javascript-Obfuscator.aspx


var POSITIONS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var VALUES = [0, 2, 4, 8, 16, 32, 64, 128, 256];
var SEED_VALUES = [2, 2, 2, 4];

var LEFT_TO_RIGHT = "L";
var RIGHT_TO_LEFT = "R";
var TOP_TO_BOTTOM = "T";
var BOTTOM_TO_TOP = "B";
var DIRECTIONS = "L R T B".split(" ");


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
  var words, values, index, zeroes;

  words = valuesString.match(/\d+/g);
  if (words.length !== SIZE) {
    throw new Error("String must contain 16 numbers!");
  }

  values = words.map(parseInt);
  index = 0;
  zeroes = 0;

  while (index < 16) {
    value = values[index++];
    if (value) {
      if (!isPowerOfTwo(value)) {
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
  this.addNewValues();
};

TwoFiftySixGame.prototype.emptyPositions = function () {
  var positions = [];
  this.values.forEach(function (value, index) {
    if (value === 0) { positions.push(index); }
  });
  return positions;
};

TwoFiftySixGame.prototype.addNewValues = function () {
  var emptyPositions = this.emptyPositions();
  var newPositions = samples(emptyPositions, 2);
  var newValues = sample(SEED_VALUES, 2);

  this.values[newPositions[0]] = newValue[0];
  this.values[newPositions[1]] = newValue[1];
  return this;
};


TwoFiftySixGame.prototype.toString = function () {
  var word, words, sliceIndex;
  words = [];
  sliceIndex = 0;
  while (sliceIndex < 4) {
    word = this.getSlice(sliceIndex).join(" ");
    words.push(word);
  }
  return words.join("   ");
};

TwoFiftySixGame.prototype.forSlice = function (rowColomIndex, direction, action) {
  var values = this.values;
  var direction = direction_ || "LEFT_TO_RIGHT";
  var slice, position, increment, count, value;

  switch (direction[0].toUpperCase()) {
    case LEFT_TO_RIGHT : position =  0; increment =  1; break;
    case RIGHT_TO_LEFT : position =  3; increment = -1; break;
    case TOP_TO_BOTTOM : position =  0; increment =  4; break;
    case BOTTOM_TO_TOP : position = 12; increment = -4; break;
  }
  count = 4;
  while (count--) {
    value = values[position];
    action.call(this, value, position);
    position += increment;
  }
}:


TwoFiftySixGame.prototype.getSlice = function (rowColomIndex, direction_) {
  var values = this.values;
  var direction = direction_ || "LEFT_TO_RIGHT";
  var slice, index, increment, count, value;

  slice = [];
  switch (direction[0].toUpperCase()) {
    case LEFT_TO_RIGHT : index =  0; increment =  1; break;
    case RIGHT_TO_LEFT : index =  3; increment = -1; break;
    case TOP_TO_BOTTOM : index =  0; increment =  4; break;
    case BOTTOM_TO_TOP : index = 12; increment = -4; break;
  }
  count = 4;
  while (count--) {
    value = values[index];
    index += increment;
    slice.push(value);
  }
  return slice;
};

TwoFiftySixGame.prototype.putSlice = function (rowColomIndex, direction, slice) {
  var values = this.values;
  var index, increment;

  switch (direction[0].toUpperCase()) {
    case LEFT_TO_RIGHT : index =  0; increment =  1; break;
    case RIGHT_TO_LEFT : index =  3; increment = -1; break;
    case TOP_TO_BOTTOM : index =  0; increment =  4; break;
    case BOTTOM_TO_TOP : index = 12; increment = -4; break;
  }
  slice.forEach(function (value) {
    values[index] = value;
    index += increment;
  });
  return this;
};

TwoFiftySixGame.prototype.smashValues = function (slice) {
  var startValues = slice.slice();
  var smashValues = [0, 0, 0, 0];
  var currentValue, nextValue;

  while (true) {
    do {
      currentValue = startValues.unshift();
      if (currentValue === undefined) { return smashValues; }
    } while (currentValue === 0);

    while (true) {
      nextValue = startValues.unshift();
      if (nextValue === undefined) { return smashValues; }
      if (currentValue === nextValue) {
        this.score += (smashValues[nextIndex++] = currentValue + nextValue);
        break;
      }
      smashValues[nextIndex++] = currentValue;
      currentValue = nextValue;
    }
  }
};

TwoFiftySixGame.prototype.smash = function (direction) {
  var index, values, smashedValues;
  index = 4;
  while (index--) {
    values = this.getSlice(index, direction);
    smashedValues = this.smashValues(values);
    this.putSlice(index, direction, smashValues);
  }
  return this.addNewValues();
};

TwoFiftySixGame.prototype.isDone = function () {
  var isFilled = this.values.every(function (value) { return value > 0; });
  if (!isFilled) { return false; }

  index = DIRECTIONS.length;
  while (index--) {
    direction = DIRECTIONS[index];
    if (this.copy().smash(direction).score !== this.score) { return false; }
  }
  return true;
}
