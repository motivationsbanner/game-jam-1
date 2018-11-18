import { getBlockTexture } from '../../helpers/block_helper';
import { GameObject } from '../game_object';

export const WALL_BLOCK_ID = 2;

export class WallBlock extends GameObject {
  constructor(x, y) {
    super(getBlockTexture(WALL_BLOCK_ID), x, y);
  }
}
