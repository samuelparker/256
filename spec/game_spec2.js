
copy
smash
smashValues
addNewValues

xdescribe("#combineNumbers", function(){

  it("adds an adjacent pair of numbers to the left", function(){
    expect(game.combineNumbers([2, 2, 2], 'left')).toEqual([4, 2]);
  });

  it("adds an multiple adjacent pairs of numbers to the left", function(){
    expect(game.combineNumbers([2, 2, 4, 4], 'left')).toEqual([4, 8]);
  });

  it("leaves a set with no duplicate numbers unchanged", function(){
    expect(game.combineNumbers([4, 8, 16, 32], 'left')).toEqual([4, 8, 16, 32]);
  });

  it("adds an adjacent pair of numbers to the right", function(){
    expect(game.combineNumbers([2, 2, 2], 'right')).toEqual([2, 4]);
  });
});
