import { getBlockTexture } from '../../helpers/block_helper';
import { BaseBlock } from './base_block';

export const START_BLOCK_ID = 1;

export class StartBlock extends BaseBlock {
  constructor(x, y) {
    super(getBlockTexture(START_BLOCK_ID), x, y);
  }
}
