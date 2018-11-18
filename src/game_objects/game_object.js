import { Sprite } from 'pixi.js';
import { BLOCK_SIZE } from '../helpers/block_helper';

export const DIRECTION = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3
};

export class GameObject extends Sprite {
  constructor(texture, x, y, solid) {
    super(texture);

    // this.x and this.y are used by the Sprite-class
    // for the actual position on the screen.
    // we use xPos/yPos/setPosition for the position without
    // the BLOCK_SIZE
    this.setPosition(x, y);
    this.solid = solid;
  }

  setPosition(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  set xPos(xPos) {
    this._xPos = xPos;
    this.x = BLOCK_SIZE * xPos;
  }

  set yPos(yPos) {
    this._yPos = yPos;
    this.y = BLOCK_SIZE * yPos;
  }

  get xPos() {
    return this._xPos;
  }

  get yPos() {
    return this._yPos;
  }
}
