import { GameObject } from '../game_object';

export class BaseEntity extends GameObject {
  constructor(textures, x, y, solid) {
    super(textures[0], x, y, solid);
    this.textures = textures;
  }

  /**
   * this gets executed every turn
   */
  update() {
    // can get implemented by child classes
  }

  /**
   * this gets called whenever an entity sends a message
   * @param {object} message the message which got sent
   */
  onMessage(message) {
    // can get implemented by child classes
  }

  /**
   * Moves Up
   */
  moveUp() {
    this.yPos -= 1;
    this.direction = DIRECTION.UP;
  }

  /**
   * Moves to the Left
   */
  moveLeft() {
    this.xPos -= 1;
    this.direction = DIRECTION.LEFT;
  }

  /**
   * Moves Down
   */
  moveDown() {
    this.yPos += 1;
    this.direction = DIRECTION.DOWN;
  }

  /**
   * Moves to the Right
   */
  moveRight() {
    this.xPos += 1;
    this.direction = DIRECTION.RIGHT;
  }
}
