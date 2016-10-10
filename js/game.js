function Game(boardState=randomBoardState()){
  this.boardState = boardState;
};

function randomBoardState(){
  var board = [];
  while (board.length < 14){
    board.push('0');
  };
  for(var i = 0; i < 2; i++){
    var boardPosition = Math.floor(Math.random() * board.length);
    board.splice(boardPosition, 0, '2');
  };
  return board.join('');
};

// game = new Game('0000200000000020');
// otherGame = new Game();
// console.log(game.boardState.length);
// console.log(otherGame.boardState.length);
