import { GameObject } from './game_object';
import { getTexture } from '../data.js';

export class Player extends GameObject {

  constructor(x = 0, y = 0) {
    super('frog', x, y, true);

    this.turn = 0;
  }

  update(x, y) {
    this.setPosition(x, y);

    // increase the game time
    this.turn++;
  }

  newPosition({ up, left, down, right }) {

    const newPos = {
      newPosX: this.xPos,
      newPosY: this.yPos
    };

    if (up) {
      newPos.newPosY -= 1;
    } else if (left) {
      newPos.newPosX -= 1;
    } else if (down) {
      newPos.newPosY += 1;
    } else if (right) {
      newPos.newPosX += 1;
    }

    return newPos;
  }
}
