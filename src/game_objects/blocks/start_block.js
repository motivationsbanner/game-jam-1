import { BaseBlock } from './base_block';

export class StartBlock extends BaseBlock {
  constructor(x, y) {
    super(StartBlock.TEXTURE, x, y, StartBlock.SOLID);
  }
}

StartBlock.ID = 1;
StartBlock.SOLID = false;
StartBlock.TEXTURE = 'startblock';
