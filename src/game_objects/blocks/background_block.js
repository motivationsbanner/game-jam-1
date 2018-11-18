import { getBlockTexture } from '../../helpers/block_helper';
import { GameObject } from '../game_object';

export const BACKGROUND_BLOCK_ID = 0;

export class BackgroundBlock extends GameObject {
  constructor(x, y) {
    super(getBlockTexture(BACKGROUND_BLOCK_ID), x, y);
  }
}
