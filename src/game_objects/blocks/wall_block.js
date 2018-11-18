import { BaseBlock } from './base_block';

export class WallBlock extends BaseBlock {
  constructor(x, y) {
    super(WallBlock.TEXTURE, x, y, WallBlock.SOLID);
  }
}

WallBlock.ID = 2;
WallBlock.SOLID = true;
WallBlock.TEXTURE = 'wall';
