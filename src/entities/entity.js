import { BaseBlock } from './blocks/base_block';
import { getTexture } from '../data.js';
import { BLOCK_SIZE } from '../helpers/block_helper';

// enums
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
  update({ up, left, down, right }) {
    throw new Error("lul implement me bby :)");
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
