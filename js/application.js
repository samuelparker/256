$(function() {
  var KEY_MAP = {
    38 : "Up",
    40 : "Down",
    37 : "Left",
    39 : "Right",
  }

  var game, view;

  function reset(event) {
    event.preventDefault();
    view.render(game.reset());
  }

  $("#game-view").on("click", "button.reset", reset);

  $(document).on("keyup", function (event) {
    event.preventDefault();
    var keyCode = event.which;
    var direction = KEY_MAP[keyCode];
    if (direction) {
      game.move(direction);
      view.render(game);
    }
  });

  game = new TwoFiftySixGame();
  view = new GameView("#game-view");
  view.render(game);
});
