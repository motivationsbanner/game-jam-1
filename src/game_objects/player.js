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
}
