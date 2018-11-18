import { getBlockTexture } from '../../helpers/block_helper';
import { GameObject } from '../game_object';

export const START_BLOCK_ID = 1;

export class StartBlock extends GameObject {
  constructor(x, y) {
    super(getBlockTexture(START_BLOCK_ID), x, y);
  }
}
