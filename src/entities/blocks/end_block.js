import { getBlockTexture } from '../../helpers/block_helper';
import { BaseBlock } from './base_block';

export const END_BLOCK_ID = 2;

export class EndBlock extends BaseBlock {
  constructor(x, y) {
    super(getBlockTexture(END_BLOCK_ID), x, y);
  }
}
