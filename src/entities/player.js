import { Entity } from '../entities/entity.js';

export class Player extends Entity {

  constructor(x = 0, y = 0) {
    super("frog.png");

    this.originX = x;
    this.originY = y;

    this.turn = 0;
  }

  update({ up, left, down, right }) {
    super.update({ up, left, down, right });

    // increase the game time
    this.turn++;
  }

  getOriginX() {
    return this.originX;
  }

  getOriginY() {
    return this.originY;
  }
}
