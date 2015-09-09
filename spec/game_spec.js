// jshint jasmine:true

"use strict";

describe("TwoFiftySixGame", function () {
  beforeEach(function() {
    this.string = "4 0 0 0   8 0 0 0   4 2 0 0   4 8 4 0";
    this.game = new TwoFiftySixGame(this.string);
  });

  describe("on instantiation", function () {
    describe("when called with no args", function () {
      beforeEach(function() {
        this.game = new TwoFiftySixGame();
      });

      it("makes a new game", function () {
        expect(this.game.constructor).toBe(TwoFiftySixGame);
      });

      it("has a score of zero", function () {
        expect(this.game.score()).toBe(0);
      });

      it("has an array of 16 values", function () {
        expect(this.game.values().length).toBe(16);
      });

      it("has 14 zeroes in the values", function () {
        var matches = this.game.values().filter(function (value) {
          return value === 0;
        })
        expect(matches.length).toBe(14);
      });

      it("has two 2 or 4 values", function () {
        var matches = this.game.values().filter(function (value) {
          return (value === 2 || value === 4);
        })
        expect(matches.length).toBe(2);
      });
    });

    describe("when called with one args", function () {
      describe('when called with a proper string', function () {
        beforeEach(function() {
          this.string = "2 4 8 16  0 0 0 32  0 0 0 64  0 0 0 2";
          this.game = new TwoFiftySixGame(this.string);
        });

        it("makes a new game", function () {
          expect(this.game.constructor).toBe(TwoFiftySixGame);
        });

        it("has a score of zero", function () {
          expect(this.game.score()).toBe(0);
        });

        it("has set values", function () {
          expect(this.game.values()).toEqual(
            [2,4,8,16, 0,0,0,32, 0,0,0,64, 0,0,0,2]);
        });
      });

      describe('when called with too few numbers', function () {
        it("throws an error", function () {
          function instantiate() {
            new TwoFiftySixGame("2 4 8 16  0 0 0 32  0 0 0 64  0 0 0");
          }
          expect(instantiate).toThrowError("String must contain 16 numbers!");
        });
      });

      describe('when called with too many numbers', function () {
        it("throws an error", function () {
          function instantiate() {
            new TwoFiftySixGame("2 4 8 16  0 0 0 32  0 0 0 64  0 0 0 2  2");
          }
          expect(instantiate).toThrowError("String must contain 16 numbers!");
        });
      });

      describe('when called with a non-power of two number', function () {
        it("throws an error", function () {
          function instantiate() {
            new TwoFiftySixGame("1 4 8 16  0 0 0 32  0 0 0 64  0 0 0 2");
          }
          expect(instantiate).toThrowError("Non-zero numbers must be powers of 2!");
        });
      });

      describe('when called with too few non-zero numbers', function () {
        it("throws an error", function () {
          function instantiate() {
            new TwoFiftySixGame("2 0 0 0  0 0 0 0  0 0 0 0  0 0 0 0");
          }
          expect(instantiate).toThrowError("Must contain at least 2 non-zero numbers!");
        });
      });

    });

    describe("when called with two args", function () {
      it('sets the score as well', function () {
        var string = "2 4 8 16  0 0 0 32  0 0 0 64  0 0 0 2";
        var game = new TwoFiftySixGame(string, 248);
        expect(game.score()).toBe(248);
      });
    });
  });

  describe("#score", function () {
    it("answers the score", function () {
      var gameWithScore = new TwoFiftySixGame(this.string, 340);
      expect(gameWithScore.score()).toBe(340);
    });
  });

  describe("#values", function () {
    it("answers an array of the values", function () {
      expect(this.game.values()).toEqual(
        [4,0,0,0,  8,0,0,0,  4,2,0,0,  4,8,4,0]);
    });

    it("answers a separate copy of the original array", function () {
      expect(this.game.values()).not.toBe(this.game.values());
    });
  });

  describe("#reset", function () {
    beforeEach(function() {
      this.game.reset();
    });

    it("answers the game itself", function () {
      expect(this.game.reset()).toBe(this.game);
    });

    it("sets the score to zero", function () {
      expect(this.game.score()).toBe(0);
    });

    it("has 14 zeroes in the values", function () {
      var matches = this.game.values().filter(function (value) {
        return value === 0;
      })
      expect(matches.length).toBe(14);
    });

    it("has two 2 or 4 values", function () {
      var matches = this.game.values().filter(function (value) {
        return (value === 2 || value === 4);
      })
      expect(matches.length).toBe(2);
    });
  });

  describe("#emptyPositions", function () {
    it("answers an array of the empty positions", function () {
      var positions = this.game.emptyPositions();
      expect(positions).toEqual([1, 2, 3, 5, 6, 7, 10, 11, 15]);
    });
  });

  describe("#filledPositions", function () {
    it("answers an array of the filled positions", function () {
      var positions = this.game.filledPositions();
      expect(positions).toEqual([0, 4, 8, 9, 12, 13, 14]);
    });
  });

  describe("#toString", function () {
    it("answers the game as a string", function () {
      expect(this.game.toString()).toMatch(/^\d+(\D+\d+){15}$/);
    });
  });

  describe("#move", function () {
    it("answers itself", function () {
      expect(this.game.move("left")).toBe(this.game);
    });

    describe("when the direction is leftward", function () {
      beforeEach(function () {
        this.game.move("left");
      });

      it("smashed the numbers to the left, without effect", function () {
        expect(this.game.values()).toEqual([4,0,0,0, 8,0,0,0, 4,2,0,0, 4,8,4,0]);
      });

      it("doesn't add new numbers", function () {
        expect(this.game.emptyPositions()).toEqual([1,2,3, 5,6,7, 10,11, 15]);
      });

      it("doesn't change the score", function () {
        expect(this.game.score()).toBe(0);
      });
    });

    describe("when the direction is rightward", function () {
      beforeEach(function () {
        this.game.move("right");
      });

      it("smashed the numbers to the right", function () {
        var string = this.game.values().join(" ");
        expect(string).toMatch(/. . . 4 . . . 8 . . 4 2 . 4 8 4/);
      });

      it("adds one new 2 or 4", function () {
        var mustFills = [3,  7,  10,11,  13,14,15];
        var extraFills = this.game.filledPositions().filter(function (position) {
          return (mustFills.indexOf(position) < 0);
        })
        var newFillIndex = extraFills[0];
        var newValue = this.game.values()[newFillIndex];

        expect(extraFills.length).toBe(1);
        expect(newValue === 2 || newValue === 4).toBe(true);
      });

      it("doesn't change the score", function () {
        expect(this.game.score()).toBe(0);
      });
    });

    describe("when the direction is upward", function () {
      beforeEach(function () {
        this.game.move("up");
      });

      it("smashed the numbers up to the top", function () {
        var string = this.game.values().join(" ");
        expect(string).toMatch(/4 2 4 . 8 8 . . 8 . . . . . . ./);
      });

      it("adds one new 2 or 4", function () {
        var mustFills = [0,1,2,  4,5,  8];
        var extraFills = this.game.filledPositions().filter(function (position) {
          return (mustFills.indexOf(position) < 0);
        })
        var newFillIndex = extraFills[0];
        var newValue = this.game.values()[newFillIndex];

        expect(extraFills.length).toBe(1);
        expect(newValue === 2 || newValue === 4).toBe(true);
      });

      it("increases the score", function () {
        expect(this.game.score()).toBe(8);
      });
    });

    describe("when the direction is downward", function () {
      beforeEach(function () {
        this.game.move("down");
      });

      it("smashed the numbers down to the bottom", function () {
        var string = this.game.values().join(" ");
        expect(string).toMatch(/. . . . 4 . . . 8 2 . . 8 8 4 ./);
      });

      it("adds one new 2 or 4", function () {
        var mustFills = [   4,  8,9,  12,13,14];
        var extraFills = this.game.filledPositions().filter(function (position) {
          return (mustFills.indexOf(position) < 0);
        })
        var newFillIndex = extraFills[0];
        var newValue = this.game.values()[newFillIndex];

        expect(extraFills.length).toBe(1);
        expect(newValue === 2 || newValue === 4).toBe(true);
      });

      it("increases the score", function () {
        expect(this.game.score()).toBe(8);
      });
    });
  });

  describe("#isDone", function () {
    it("answers false when the game is not filled", function () {
      var notFillGame = new TwoFiftySixGame(
        "0 2 4 8   0 2 4 8   0 2 4 8   0 2 4 8");
      expect(notFillGame.isDone()).toBe(false);
    });

    it("answers false when the game still has moves", function () {
      var movesLeftGame = new TwoFiftySixGame(
        "2 4 2 4   4 2 4 2   2 4 2 4   4 2 8 4");
      expect(movesLeftGame.isDone()).toBe(false);
    });

    it("answers true when the game  has no moves left", function () {
      var noMovesLeftGame = new TwoFiftySixGame(
        "2 4 2 4   4 2 4 2   2 4 2 4   4 2 4 2");
      expect(noMovesLeftGame.isDone()).toBe(true);
    });
  });
});
