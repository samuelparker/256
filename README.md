# 256! A 2048 Clone.

## Learning Competencies

* Build a JavaScript interface independent of a backend.
* Build a complex JS model independent of the interface.
* Integrate the JS model with the HTML interface.
* Use the Mousetrap.js library to bind keyboard events.

## Summary

Let's build a clone of the game [2048](http://gabrielecirulli.github.io/2048/).

We will implement the core game play. Play the game for a few minutes so you understand the rules of the game. How do blocks spawn? When does the game disallow a movement? How do blocks merge? How do blocks slide? Try to write a specification of how the game mechanics work.

## Releases

### Release 0: Create a barebones model object with an appropriate data structure

In `game.js` create a Game model to store the state of our game. Use JavaScript's optional parameters so that we can call the constructor function in two ways:

`game = new Game() // generates a random starting board`

`game = new Game('0000202000000000') // generates a board with the given start`

The latter will come in handy for testing, which you will certainly want to do for this project given the tricky game rules.

Add a `toString()` method to your Game model.

```
> game.toString()
"0000
2020
0000
0000"
```

### Release 1: Build the game logic

The Game model will expose a very simple public interface to the controller.

```
> game.toString()
"0000
2020
0000
0000"
> game.move('left')
> game.toString()
"0000
0004
2000
0000"
> game.move('up')
"2004
0000
0000
0020"
```

Implement the `move` method for all four directions. Think about useful helper methods you might need, such as `spawnBlock`.

You might want to setup Jasmine and write specs for model. Or you might want to make a simple `game_test.js` file that includes simple assertions. This game has a variety of interesting edge cases to consider, so make sure you have the logic working correctly.

### Release 2: Integrate the model with the interface via a controller

In your application.js file code to instantiate a new instance of the Game model. Using Mousetrap make it so that your keypresses will send `move` commands to the Game. 

In your Game model and controller write methods to update the DOM to display your board. 

### Release 3: Bonuses!

* Implement a score display.
* Implement starting a new game.
* Implement storing the game in LocalStorage so that it still shows up if you close the tab.
