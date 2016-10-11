$(document).ready(function() {
  generateBoardView(newGame);
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
