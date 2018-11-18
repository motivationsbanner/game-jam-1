import { BaseEntity } from './base_entity';

export const LEVER_ENTITY_ID = 1;

export class LeverEntity extends BaseEntity {
  constructor(textures, x, y, solid, options) {
    super(textures, x, y, solid);

    this.isActive = false;
    this.color = options.color; // undefined is allowed
  }

  update(x, y, gameCallbacks) {
    if (x === this.xPos && y === this.yPos) {
      this.isActive = !this.isActive;

      this.texture = this.textures[this.isActive ? 1 : 0];
      gameCallbacks.sendMessage({type: 'toggle-doors', color: this.color});
    }
  }
}
