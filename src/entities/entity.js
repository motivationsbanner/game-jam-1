import { Rectangle, Sprite } from 'pixi.js';
import { getTexture } from '../data.js';

// enums
const DIRECTION = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3
};
const BLOCK_SIZE = 32;

export class Entity extends Sprite {
  constructor(textureName) {
    super(getTexture(textureName));

    let height = this.texture.height;
    let width = this.texture.width;

    this.texture.frame = new Rectangle(0, 0, width, height);

    this.direction = DIRECTION.DOWN;
  }

  /**
   * Updates the Position of the Element
   */
  update({ up, left, down, right }) {
    let old = {
      x: this.x,
      y: this.y
    };

    if (up && !down) {
      this.moveUp();
    }

    if (left && !right) {
      this.moveLeft();
    }

    if (down && !up) {
      this.moveDown();
    }

    if (right && !left) {
      this.moveRight();
    }
  }

  /**
   * Moves Up
   */
  moveUp() {
    this.y -= BLOCK_SIZE;
    this.direction = DIRECTION.UP;
  }

  /**
   * Moves to the Left
   */
  moveLeft() {
    this.x -= BLOCK_SIZE;
    this.direction = DIRECTION.LEFT;
  }

  /**
   * Moves Down
   */
  moveDown() {
    this.y += BLOCK_SIZE;
    this.direction = DIRECTION.DOWN;
  }

  /**
   * Moves to the Right
   */
  moveRight() {
    this.x += BLOCK_SIZE;
    this.direction = DIRECTION.RIGHT;
  }
}
