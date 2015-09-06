// jshint jasmine:true

"use strict";

describe("TwoFiftySixGame", function () {
  describe("#isGreaterThanZero", function () {
    it("answers true if the number is greater than zero", function () {
      expect(Util.isGreaterThanZero(10)).toBe(true);
    });

    it("answers false if the number is equal to zero", function () {
      expect(Util.isGreaterThanZero(0)).toBe(false);
    });

    it("answers false if the number is less than zero", function () {
      expect(Util.isGreaterThanZero(-10)).toBe(false);
    });
  });

  describe("#isBetween", function () {
    it("answers true if a number is between the min and max", function () {
      expect(Util.isBetween(2, 1, 3)).toBe(true);
      expect(Util.isBetween(1, 1, 3)).toBe(true);
      expect(Util.isBetween(3, 1, 3)).toBe(true);
    });

    it ("answers false if a number is below the min", function () {
      expect(Util.isBetween(0, 1, 3)).toBe(false);
    });

    it ("answers false if a number is above the max", function () {
      expect(Util.isBetween(4, 1, 3)).toBe(false);
    });
  });

  describe("#getRandom", function () {
    describe("when called with one args", function () {
      it("answers a random from 0 to under the limit", function () {
        var count = 100;
        var results = [];
        while (count--) {
          results.push(Util.getRandom(2));
        }
        var answer = results.every(function (number) {
          return Util.isBetween(number, 0, 1);
        });
        expect(answer).toBe(true);
      });
    });

    describe("when called with two args", function () {
      it("answers a random from min to under the limit", function () {
        var count = 100;
        var results = [];
        while (count--) {
          results.push(Util.getRandom(10, 13));
        }
        var answer = results.every(function (number) {
          return Util.isBetween(number, 10, 12);
        });
        expect(answer).toBe(true);
      });
    });
  });

  describe("#isPowerOfTwo", function () {
    it("answers true when the number is a power of two", function () {
      expect(Util.isPowerOfTwo(2)).toBe(true);
      expect(Util.isPowerOfTwo(4)).toBe(true);
      expect(Util.isPowerOfTwo(64)).toBe(true);
      expect(Util.isPowerOfTwo(64.0)).toBe(true);
      expect(Util.isPowerOfTwo(1024)).toBe(true);
    });

    it("answers false when the number is not a power of two", function () {
      expect(Util.isPowerOfTwo(0)).toBe(false);
      expect(Util.isPowerOfTwo(3)).toBe(false);
      expect(Util.isPowerOfTwo(63)).toBe(false);
      expect(Util.isPowerOfTwo(64.0000001)).toBe(false);
      expect(Util.isPowerOfTwo(63.9999999)).toBe(false);
    });

    it("answers false when the number is negative", function () {
      expect(Util.isPowerOfTwo(-2)).toBe(false);
    });
  });

  describe("#sample", function () {
    it("answers a random element from an array", function () {
      var array = [1,2,3,4,5];
      expect(array).toContain(Util.sample(array));
    });
  });

  describe("#samples", function () {
    it("answers an array of non-repeating random element from the original array", function () {
      var array = [1,2,3,4,5];
      var results = Util.samples(array, 3);
      results.forEach(function (number) {
        var index = array.indexOf(number);
        array.splice(index, 1);
      });
      expect(array.length).toBe(2);
    });
  });

  describe("#areEqualArrays", function () {
    beforeEach(function () {
      this.arrayA = [1,2,3,4,5];
      this.arrayB = [1,2,3,4,5];
      this.arrayC = [1,2,3,4];
      this.arrayD = [1,2,3,4,55];
    });
    it("answers true if both arrays have the same elements", function () {
      expect(Util.areEqualArrays(this.arrayA, this.arrayB)).toBe(true);
    });

    it("answers false if the arrays have different elements", function () {
      expect(Util.areEqualArrays(this.arrayA, this.arrayC)).toBe(false);
      expect(Util.areEqualArrays(this.arrayA, this.arrayD)).toBe(false);
    });
  });
});
