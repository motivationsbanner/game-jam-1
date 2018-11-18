import { BaseEntity } from './base_entity';

export class EndEntity extends BaseEntity {
  constructor(x, y, direction) {
    super(EndEntity.TEXTURES, x, y, direction, false);
  }

  update(x, y, gameCallbacks) {
    if (x === this.xPos && y === this.yPos) {
      gameCallbacks.loadNextLevel();
    }
  }
}

EndEntity.ID = 0;
EndEntity.TEXTURES = ['end'];
