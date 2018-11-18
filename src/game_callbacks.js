// callbacks for update functions of entities
// feel free to come up with a better name
export class GameCallbacks {
  constructor(game) {
    this.game = game;
  }

  loadNextLevel() {
    this.game.loadNextLevel();
  }
}
