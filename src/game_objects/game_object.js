import { Sprite } from 'pixi.js';
import { BLOCK_SIZE } from '../helpers/block_helper';
import { getTexture } from '../data';

export class GameObject extends Sprite {
  constructor(texture, x, y, solid) {
    super(getTexture(`${texture}.png`));

    // this.x and this.y are used by the Sprite-class
    // for the actual position on the screen.
    // we use xPos/yPos/setPosition for the position without
    // the BLOCK_SIZE

    this.anchor.set(0.5, 0.5);
    this.setPosition(x, y);
    this.solid = solid;
  }

  setPosition(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  set xPos(xPos) {
    this._xPos = xPos;
    this.x = BLOCK_SIZE * xPos + BLOCK_SIZE / 2;
  }

  set yPos(yPos) {
    this._yPos = yPos;
    this.y = BLOCK_SIZE * yPos + BLOCK_SIZE / 2;
  }

  get xPos() {
    return this._xPos;
  }

  get yPos() {
    return this._yPos;
  }
}
