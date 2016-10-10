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



Game.prototype.move = function(direction){
  switch (direction) {
    case 'right':
      moveRight(this.board);
      break;
    case 'left':
      moveLeft(this.board);
      break;
    case 'up':
      moveUp(this.board);
      break;
    case 'down':
      moveDown(this.board);
      break;
  }
}

// returns a new merged and moved row
function eachRowNumberFromLeft(row){
  numbers = [];
  for(var i = 0; i < row.length; i++){
    if (row[i] > 0){
      numbers.push(row[i]);
    };
  };
  return mergeNumbers(numbers);
};

// merges the input set of numbers and returns them in an array filled with 0's
function mergeNumbers(numbers){
  var newRow = []
  // iterate through the numbers
  for(var i = 0; i < numbers.length; i++){
    var number = numbers[i];
    // if it is not the last number
    if(numbers[i+1] != undefined){
      var nextNumber = numbers[i+1];
      // if the next number matches the current number
      if(number == nextNumber){
        // merge them
        newRow.push(number+nextNumber);
        // skip the merged next-number
        i++;
      } else {
        // if no match, add the number to the new row
        newRow.push(numbers[i]);
      };
    } else {
      // if last number, add it to the new row
      newRow.push(numbers[i]);
    };
  };
  // fill the rest of the row with zeros
  while(newRow.length < 4){
    newRow.push(0);
  };
  return newRow;
};

// returns the [number, it's index in a row] for each number in the row
  // going right to left
function eachRowNumberFromRight(row){
  return eachRowNumberFromLeft(row).reverse()
};

function moveRight(board){
  for(var i = 0; i < board.length; i++){
    board[i] = eachRowNumberFromRight(board[i]);
  };
};

function moveLeft(board){
  for(var i = 0; i < board.length; i++){
    board[i] = eachRowNumberFromLeft(board[i]);
  };
};


// get the numbers out of a column and into an array
function moveColumnUp(board, columnNumber){
  var newColumn = changeColumn(board, columnNumber);

  // rebuild the column with the new array
  board.forEach(function(row){
    row[columnNumber] = newColumn.shift();
  });
};

function moveColumnDown(board, columnNumber){
  var newColumn = changeColumn(board, columnNumber);

  // rebuild the column with the new array
  board.forEach(function(row){
    row[columnNumber] = newColumn.pop();
  });
};

function changeColumn(board, columnNumber){
  var numbers = [];
  board.forEach(function(row){
    if (row[columnNumber] > 0){
      numbers.push(row[columnNumber]);
    };
  });

  // merge the numbers
  return mergeNumbers(numbers);
};

function moveUp(board){
  for(var i = 0; i < board.length; i++){
    moveColumnUp(board, i);
  };
};

function moveDown(board){
  for(var i = 0; i < board.length; i++){
    moveColumnDown(board, i);
  };
};




