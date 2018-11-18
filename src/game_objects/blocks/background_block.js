import { BaseBlock } from './base_block';

export class BackgroundBlock extends BaseBlock {
  constructor(x, y) {
    super(BackgroundBlock.TEXTURE, x, y, BackgroundBlock.SOLID);
  }
}

BackgroundBlock.ID = 0;
BackgroundBlock.SOLID = false;
BackgroundBlock.TEXTURE = 'background';
