import { BaseBlock } from './blocks/base_block';

export const DIRECTION = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3
};

export class Entity extends BaseBlock {
  constructor(texture, x, y, solid) {
    super(texture, x, y, solid);
  }

  /**
   * Updates the Position of the Element
   */
  update() {
    throw new Error("lul implement me bby :)");
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
