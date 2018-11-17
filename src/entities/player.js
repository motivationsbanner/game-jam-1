import { Entity, DIRECTION } from '../entities/entity.js';
import { getTexture } from '../data.js';

export class Player extends Entity {

  constructor(x = 0, y = 0) {
    super(getTexture("frog.png"), x, y, true);

    this.turn = 0;
  }

  update(x, y) {
    this.x = x * 32;
    this.y = y * 32;
    
    // increase the game time
    this.turn++;
  }

  newPosition({ up, left, down, right }) {

    const newPos = {
      newPosX: this.x / 32,
      newPosY: this.y / 32
    };

    if (up) {
      this.direction = DIRECTION.UP;
      newPos.newPosY -= 1;
    } else if (left) {
      this.direction = DIRECTION.LEFT;
      newPos.newPosX -= 1;
    } else if (down) {
      this.direction = DIRECTION.DOWN;
      newPos.newPosY += 1;
    } else if (right) {
      this.direction = DIRECTION.RIGHT;
      newPos.newPosX += 1;
    }

    return newPos;
  }
}
