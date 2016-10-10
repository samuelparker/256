function Game(boardState=randomBoardState()){
  this.boardState = boardState;
  this.board = generateBoard(boardState);
};

function generateBoard(board){
  var boardArray = board.split('').map(function(number){
    return parseInt(number);
  });
  var newBoard = [];
  while(newBoard.length < 4){
    newBoard.push(boardArray.splice(0,4))
  }
  return newBoard
}

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

Game.prototype.toString = function(){
  var boardString = '';
  this.board.forEach(function(row){
    boardString += row.join('') + '\n';
  });
  return boardString;
};

game = new Game('0000200000000020');
otherGame = new Game();
console.log(game.board);
console.log(game.toString());
