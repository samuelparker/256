$(document).ready(function() {
  generateBoardView(newGame);
  Mousetrap.bind('up', function() { pressButton(newGame, 'up') });
  Mousetrap.bind('down', function() { pressButton(newGame, 'down') });
  Mousetrap.bind('left', function() { pressButton(newGame, 'left') });
  Mousetrap.bind('right', function() { pressButton(newGame, 'right') });
});

newGame = new Game;

function generateBoardView(game){
  game.board.forEach(function(row){
    $(".game-board").append("<div class='game-row'></div>");
    row.forEach(function(number){
      $(".game-board").last().append("<div class='game-block'><h1>"+number+"</h1></div>");
    });
  });
};

function pressButton(game, direction){
  $(".game-board").empty();
  game.move(direction);
  generateBoardView(game);
};
