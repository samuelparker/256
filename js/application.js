$(function() {
  var KEY_MAP = {
    38 : "Up",
    40 : "Down",
    37 : "Left",
    39 : "Right",
  }

  var game, view;

  function reset(event) {
    if (event) { event.preventDefault(); }
    game = new TwoFiftySixGame();
    view.render(game);
  }

  $("#reset").on("click", reset);

  $(document).on("keyup", function (event) {
    event.preventDefault();
    var keyCode = event.which;
    var direction = KEY_MAP[keyCode];
    if (direction) {
      game.move(direction);
      view.render(game);
    }
  });

  view = new GameView("#game-view");

});
