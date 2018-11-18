// callbacks for update functions of entities
// feel free to come up with a better name
export class GameCallbacks {
  constructor(game) {
    this.game = game;
  }

  loadNextLevel() {
    this.game.loadNextLevel();
  }

  /**
   * sends a message to all entities
   * @param {object} message the message to send
   */
  sendMessage(message) {
    // it might be a bad idea to call these directly but I'm lazy
    this.game.level.entities.forEach(entity => entity.onMessage(message));
  }
}
