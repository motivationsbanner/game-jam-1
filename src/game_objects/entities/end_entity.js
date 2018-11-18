import { BaseEntity } from './base_entity';

export const END_ENTITY_ID = 0;

export class EndEntity extends BaseEntity {
  constructor(textures, x, y, solid) {
    super(textures, x, y, solid);
  }

  update(x, y, gameCallbacks) {
    if (x === this.xPos && y === this.yPos) {
      gameCallbacks.loadNextLevel();
    }
  }
}
