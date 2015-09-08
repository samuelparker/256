// jshint jquery:true

function GameView(selector) {
  this.$element = $(selector);
  this.build();
}

GameView.prototype.buildCell = function() {
  return $("<td>");
};

GameView.prototype.buildSlice = function() {
  var $slice = $("<tr>");
  var count = 4;
  while (count--) { $slice.append(this.buildCell()); }
  return $slice;
};

GameView.prototype.buildGrid = function() {
  var $grid = $("<table>");
  var count = 4;
  while (count--) { $grid.append(this.buildSlice()); }
  return (this.$grid = $grid);
};

GameView.prototype.buildHeader = function() {
  var $header = $("<div>").addClass("header");
  var $paragraph = $("<p>").text("Score: ").appendTo($header);

  this.$score = $("<span>").appendTo($paragraph);
  this.$notifier = $("<p>").appendTo($header);
  return $header;
};

GameView.prototype.build = function() {
  this.$element
    .append(this.buildHeader())
    .append(this.buildGrid());
};

GameView.prototype.render = function(game) {
  var values = game.values();
  this.$score.text(game.score());
  if (game.isDone()) { this.$notifier.text("GAME OVER"); }

  this.$grid.find("td").each(function (index, element) {
    $(element).text(values[index]);
  });
};
