import { BaseBlock } from './base_block';

export class EndBlock extends BaseBlock {
  constructor(x, y) {
    super(EndBlock.TEXTURE, x, y, EndBlock.SOLID);
  }
}

EndBlock.ID = 3;
EndBlock.SOLID = false;
EndBlock.TEXTURE = 'endblock';
