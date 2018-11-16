import { getBlockTexture } from '../../helpers/block_helper';
import { BaseBlock } from './base_block';

export const BACKGROUND_BLOCK_ID = 0;

export class BackgroundBlock extends BaseBlock {
  constructor(x, y) {
    super(getBlockTexture(BACKGROUND_BLOCK_ID), x, y);
  }
}
