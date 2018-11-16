import { Sprite } from 'pixi.js';
import { BLOCK_SIZE } from '../../helpers/block_helper';

export class BaseBlock extends Sprite {
  constructor(texture, x, y) {
    super(texture);
    this.x = BLOCK_SIZE * x;
    this.y = BLOCK_SIZE * y;
  }
}
