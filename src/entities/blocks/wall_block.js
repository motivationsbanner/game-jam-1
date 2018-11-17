import { getBlockTexture } from '../../helpers/block_helper';
import { BaseBlock } from './base_block';

export const WALL_BLOCK_ID = 2;

export class WallBlock extends BaseBlock {
  constructor(x, y) {
    super(getBlockTexture(WALL_BLOCK_ID), x, y);
  }
}
