// callbacks passed to update functions of entities
// feel free to come up with a better name
export class GameCallbacks {
  constructor(game) {
    this.game = game;
  }

  /**
   * sends a message to all entities
   * @param {object} message the message to send
   */
  sendMessage(message) {
    // it might be a bad idea to call these directly but I'm lazy
    this.game.level.entities.forEach(entity => entity.onMessage(message));
  }

  /**
   * returns true if the block at (x, y) is solid
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   */
  isSolid(x, y) {
    return this.game.level.isSolid(x, y);
  }

  /**
   * removes the entity from the game
   * @param {BaseEntity} entity 
   */
  remove(entity) {
    let level = this.game.level;

    level.removeChild(entity);
    level.entities = level.entities.filter(e => e !== entity);
  }

  /**
   * kills the player
   */
  killPlayer() {
    this.game.restartLevel();
  }

  /**
   * spawns an entity
   * @param {Entity} entity the entity to spawn
   */
  spawnEntity(data) {
    this.game.level.spawnEntity(data);
  }
}
